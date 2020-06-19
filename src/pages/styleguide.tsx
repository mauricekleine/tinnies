import React from "react";

import Page from "../components/Page";
import Rating from "../components/ui/Rating";
import Button from "../components/ui/buttons";
import {
  Bold,
  FinePrint,
  Heading,
  Lead,
  Link,
  Muted,
} from "../components/ui/typography";

const StyleGuide = () => (
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
  </Page>
);

export default StyleGuide;
