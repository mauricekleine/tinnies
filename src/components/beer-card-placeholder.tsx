import classNames from "classnames";

import Avatar from "./ui/avatar";
import Card from "./ui/card";
import Rating from "./ui/rating";
import Theme from "./ui/theme";

const BeerCardPlaceholder = () => (
  <Theme>
    {({ bg }) => (
      <div className="overflow-hidden relative skeleton">
        <Card px="0">
          <div className="flex justify-between px-6">
            <div className="flex items-center">
              <div className="mr-2">
                <Avatar />
              </div>

              <div
                className={classNames(
                  bg.default,
                  "flex flex-col leading-snug rounded text-transparent"
                )}
              >
                <p className="truncate w-40">
                  <span className="font-semibold">Username</span>
                  <span className="">rated a beer</span>
                </p>

                <span className="text-sm">1 year ago</span>
              </div>
            </div>
          </div>

          <div className={classNames(bg.default, "h-64 my-5 w-full")} />

          <div className="px-6">
            <div className="mb-1">
              <Rating disabled value={5} />
            </div>

            <div className={classNames(bg.default, "rounded text-transparent")}>
              <div className="font-semibold text-xl">Beer name</div>
              <div className="text-transparent">Brewery name</div>
            </div>
          </div>
        </Card>
      </div>
    )}
  </Theme>
);

export default BeerCardPlaceholder;
