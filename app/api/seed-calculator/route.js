import { NextResponse } from "next/server";
import { findCropInfo } from "@/utils/cropCalculator";

export async function POST(req) {
  try {
    const { cropName, area } = await req.json();
    const crop = findCropInfo(cropName);
    if (!crop)
      return NextResponse.json({ error: "Crop not found" }, { status: 404 });

    const seedRate = crop.seed_rate_kg_per_acre || 0;
    const seedRequiredKg = (seedRate * area).toFixed(2);

    return NextResponse.json({ seedRequiredKg });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
