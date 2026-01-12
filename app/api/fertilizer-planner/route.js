import { NextResponse } from "next/server";
import { findCropInfo } from "@/utils/cropCalculator";

export async function POST(req) {
  try {
    const { cropName, area } = await req.json();
    const crop = findCropInfo(cropName);
    if (!crop)
      return NextResponse.json({ error: "Crop not found" }, { status: 404 });

    const N = (crop.n_ratio_kg_per_acre || 0) * area;
    const P = (crop.p_ratio_kg_per_acre || 0) * area;
    const K = (crop.k_ratio_kg_per_acre || 0) * area;

    return NextResponse.json({
      fertilizer: {
        N: N.toFixed(2),
        P: P.toFixed(2),
        K: K.toFixed(2),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
