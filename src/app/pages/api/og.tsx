import { ImageResponse } from "next/server";
import { ReactIcon } from "@/components/icons";
export const runtime = "edge";

export async function GET() {
  const title = "Modeling and Simulation";
  const description = "Nathan Roark";
  return new ImageResponse(
    (
      <div tw="flex flex-row-reverse h-full bg-gray-900">
        <div tw="flex w-1/2 h-full text-[#00D8FF] pt-20">
          <ReactIcon size={700} />
        </div>
        <div tw="flex flex-col w-1/2 p-[48px] mt-auto">
          <h1 tw="text-9xl text-emerald-300">{title}</h1>
          <p tw="text-7xl text-gray-300">{description}</p>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    }
  );
}
