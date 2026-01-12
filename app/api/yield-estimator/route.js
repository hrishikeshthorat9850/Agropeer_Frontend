import { NextResponse } from "next/server";
import { findCropInfo, calculateYieldAndPricing } from "@/utils/cropCalculator";

export async function POST(req) {
  try {
    const { cropName, area } = await req.json();
    const crop = findCropInfo(cropName);
    if (!crop)
      return NextResponse.json({ error: "Crop not found" }, { status: 404 });

    const result = calculateYieldAndPricing(crop, area);

    return NextResponse.json({ yield: result.expectedYieldKg });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
