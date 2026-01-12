import { NextResponse } from "next/server";
import { findCropInfo, calculateIrrigation } from "@/utils/cropCalculator";

export async function POST(req) {
  try {
    const { cropName, area } = await req.json();
    const crop = findCropInfo(cropName);
    if (!crop)
      return NextResponse.json({ error: "Crop not found" }, { status: 404 });

    // Use default values for optional params since this is a simple quick calculator
    const result = calculateIrrigation(crop, area, "Loam");

    return NextResponse.json({
      totalWater_liters: result.defaultWaterAmountLiters,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
