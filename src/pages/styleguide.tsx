import classNames from "classnames";
import { useRef } from "react";

import Page from "../components/page";
import Button from "../components/ui/button";
import Card from "../components/ui/card";
import Dropdown from "../components/ui/dropdown";
import Modal from "../components/ui/modal";
import Rating from "../components/ui/rating";
import Theme from "../components/ui/theme";
import {
  Bold,
  FinePrint,
  Heading,
  Lead,
  Link,
  Muted,
} from "../components/ui/typography";
import useToggle from "../components/ui/utils/use-toggle";

const StyleGuide = () => {
  const modalRef = useRef();
  const { handleToggle: handleModalToggle, isOpen: isModalOpen } =
    useToggle(modalRef);

  return (
    <Theme>
      {({ border }) => (
        <Page title="Styleguide">
          <Lead>Typography</Lead>
          <Heading>Heading</Heading>
          <p>
            <Bold>Bold</Bold>
          </p>
          <p>
            <Link href="/styleguide">Link</Link>
          </p>
          <p>
            <Muted>Muted</Muted>
          </p>
          <p>
            <FinePrint>Fine print</FinePrint>
          </p>

          <Button onClick={() => console.log("Button")}>Button</Button>
          <Button isTransparent onClick={() => console.log("Button")}>
            Button
          </Button>

          <Rating value={3} />
          <Rating disabled value={3} />

          <div className="relative mb-32">
            <Dropdown isOpen>
              <div className="flex flex-col px-4 py-2">
                <span
                  className={classNames(
                    border.colors.default,
                    "border-b sm:mb-2 py-2"
                  )}
                >
                  Dropdown with button
                </span>

                <Button onClick={() => console.log("Button")}>Button</Button>
              </div>
            </Dropdown>
          </div>

          <Card px="4">
            <div className="flex flex-col">
              <span
                className={classNames(
                  border.colors.default,
                  "border-b sm:mb-2 py-2"
                )}
              >
                Card with button
              </span>

              <Button onClick={() => console.log("Button")}>Button</Button>
            </div>
          </Card>

          <Button onClick={handleModalToggle}>Trigger modal</Button>

          <Modal isOpen={isModalOpen} ref={modalRef}>
            <div className="flex flex-col">
              <span
                className={classNames(
                  border.colors.default,
                  "border-b sm:mb-2 py-2"
                )}
              >
                Modal with button
              </span>

              <Button onClick={handleModalToggle}>Close modal</Button>
            </div>
          </Modal>
        </Page>
      )}
    </Theme>
  );
};

export default StyleGuide;
