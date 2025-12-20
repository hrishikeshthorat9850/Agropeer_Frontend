// Supabase Edge Function (Deno runtime)
// Fetches market prices for last 3 days, cleans & upserts into Supabase daily at 5:30 AM IST

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function formatDate(date: Date): string {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  try {
    const baseUrl = Deno.env.get("MARKET_API_URL");
    const apiKey = Deno.env.get("MARKET_PRICES_API_KEY");
    const limit = 1000;
    const today = new Date();

    // 📅 Last 3 days
    const dateList = [
      formatDate(today),
      formatDate(new Date(today.getTime() - 24 * 60 * 60 * 1000)),
      formatDate(new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)),
    ];

    console.log("🔎 Fetching market data for:", dateList.join(", "));
    const allFetchedData: any[] = [];

    for (const date of dateList) {
      let offset = 0;
      const dateData: any[] = [];

      while (true) {
        console.log("[fetch-market-prices] - base url is :",baseUrl);
        console.log("[fetch-market-prices] - API key is :",apiKey);
        console.log("[fetch-market-prices] Limit is :",limit);
        console.log("[fetch-market-prices] Offset is :",offset);
        const url = `${baseUrl}?api-key=${apiKey}&format=json&limit=${limit}&offset=${offset}&filters[Arrival_Date]=${date}`;
        console.log("[fetch-market-prices] - API url is :",url);
        const res = await fetch(url);
        console.log("[fetch-market-prices] Response from API is :",res);
        const json = await res.json();
        console.log("[fetch-market-prices] Response after res.json() :",json);
        const records = json.records || [];
        console.log("[fetch-market-prices] Records are :",records);
        if (records.length === 0) break;
        dateData.push(...records);
        offset += limit;
      }

      if (dateData.length > 0) {
        console.log(`✅ ${dateData.length} records found for ${date}`);
        allFetchedData.push(...dateData);
      } else {
        console.log(`❌ No records for ${date}`);
      }
    }

    if (allFetchedData.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No records for past 3 days",
        }),
        { status: 404 }
      );
    }

    console.log(`🧾 Total combined records: ${allFetchedData.length}`);

    // 🧠 Deduplicate
    const uniqueMap = new Map<string, any>();
    for (const record of allFetchedData) {
      const key = `${record.Market}_${record.Commodity}_${record.Arrival_Date}`;
      if (!uniqueMap.has(key)) uniqueMap.set(key, record);
    }
    const uniqueRecords = Array.from(uniqueMap.values());
    console.log(`✅ Unique records: ${uniqueRecords.length}`);

    // 🧹 Step 1: Cleanup (duplicates + old data)
    const { error: cleanupError } = await supabase.rpc(
      "remove_duplicates_and_old_market_prices"
    );
    if (cleanupError) console.error("⚠️ Cleanup error:", cleanupError.message);
    else console.log("✅ Cleanup complete.");

    // 🧭 Step 2: Upsert
    const { error: upsertError } = await supabase
      .from("market_prices")
      .upsert(
        uniqueRecords.map((item) => ({
          state: item.State,
          district: item.District,
          market: item.Market,
          commodity: item.Commodity,
          variety: item.Variety,
          min_price: item.Min_Price,
          max_price: item.Max_Price,
          modal_price: item.Modal_Price,
          arrival_date: item.Arrival_Date,
        })),
        { onConflict: ["market", "commodity", "arrival_date"] }
      );

    if (upsertError) throw new Error(upsertError.message);

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "✅ Market data fetched, cleaned, and upserted for last 3 days (kept only 7 days total)",
        fetched_dates: dateList,
        total_records: allFetchedData.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Function failed:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to fetch or upsert market prices",
      }),
      { status: 500 }
    );
  }
});
