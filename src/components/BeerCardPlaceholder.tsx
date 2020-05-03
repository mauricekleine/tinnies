import React from "react";

import Avatar from "./ui/Avatar";
import Card from "./ui/Card";
import Rating from "./ui/Rating";
import colors from "./ui/colors";

const BeerCardPlaceholder = () => (
  <div className="overflow-hidden relative skeleton">
    <Card px="0">
      <div className="flex justify-between px-6">
        <div className="flex items-center">
          <div className="mr-2">
            <Avatar />
          </div>

          <div
            className={`bg-${colors.grayLight} flex flex-col leading-snug rounded text-transparent`}
          >
            <p className="truncate w-40">
              <span className="font-semibold">Username</span>
              <span className="">rated a beer</span>
            </p>

            <span className="text-sm">1 year ago</span>
          </div>
        </div>
      </div>

      <div className={`bg-${colors.grayLight} h-64 my-5 w-full`} />

      <div className="px-6">
        <div className="mb-1">
          <Rating color={colors.grayLight} value={5} />
        </div>

        <div className={`bg-${colors.grayLight} rounded text-transparent`}>
          <div className="font-semibold text-xl">Beer name</div>
          <div className="text-transparent">Brewery name</div>
        </div>
      </div>
    </Card>
  </div>
);

export default BeerCardPlaceholder;
