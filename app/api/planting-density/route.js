import { NextResponse } from "next/server";
import { findCropInfo } from "@/utils/cropCalculator";

export async function POST(req) {
  try {
    const { cropName, area } = await req.json();
    const crop = findCropInfo(cropName);
    if (!crop)
      return NextResponse.json({ error: "Crop not found" }, { status: 404 });

    const density = crop.planting_density_per_acre || 0;
    const plants = Math.round(density * area);

    return NextResponse.json({ plants });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
