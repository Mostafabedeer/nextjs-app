import { HotNetworkData } from "@/constants";
import ROUTES from "@/constants/routes";
import Link from "next/link";

function HotNetwork() {
  return (
    <div className="background-light900_dark200 border-dark100_light900 hidden h-full rounded-lg border p-4 sm:col-span-2 sm:col-start-9 sm:row-span-4 sm:row-start-2 sm:block">
      <div>
        <h2 className="ext-dark200_light900 mb-4 text-lg font-bold">
          Hot Network
        </h2>
        <ul className="flex flex-col gap-4 text-sm">
          {HotNetworkData.map((item) => (
            <li key={item.id}>
              <Link
                href={ROUTES.QUESTION(String(item.id))}
                className="text-dark300_light900 hover:text-primary-500 flex items-center justify-between gap-1.5 font-medium hover:underline sm:text-[12px] md:text-sm"
              >
                {item.title}
                <span className="h3-bold">&#8827;</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HotNetwork;
