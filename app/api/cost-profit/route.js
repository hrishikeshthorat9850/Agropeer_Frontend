import { NextResponse } from "next/server";
import { findCropInfo, calculateYieldAndPricing } from "@/utils/cropCalculator";

export async function POST(req) {
  try {
    const { cropName, area, marketPrice } = await req.json();
    const crop = findCropInfo(cropName);
    if (!crop)
      return NextResponse.json({ error: "Crop not found" }, { status: 404 });

    const baseResult = calculateYieldAndPricing(crop, area);

    // Recalculate if marketPrice is provided by user
    let revenue = baseResult.estimatedRevenue;
    let profit = baseResult.estimatedProfit;

    if (marketPrice && !isNaN(Number(marketPrice))) {
      revenue = Math.round(baseResult.expectedYieldKg * Number(marketPrice));
      profit = Math.round(revenue - baseResult.estimatedCostPerAcre * area);
    }

    return NextResponse.json({
      profit,
      revenue,
      totalCost: Math.round(baseResult.estimatedCostPerAcre * area),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
