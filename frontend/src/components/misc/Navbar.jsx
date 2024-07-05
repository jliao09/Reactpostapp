import React from "react";
import classes from "./Navbar.module.css";
//import { MantineLogo } from "@mantine/ds";
import { Container, Group, Burger, Drawer, Stack, Text } from "@mantine/core";
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";
import SVGComponent from "./SVGComponent";

const Navbar = () => {
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <Group>
          <SVGComponent width="32" height="32" />
          <Text size="xl" weight={700}>PhotoShare</Text>
        </Group>
        <Group gap={5} visibleFrom="xs">
          {items.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
        </Group>
        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          size="100%"
          onClose={toggle}
        >
          <Stack>
            {items.map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))}
          </Stack>
        </Drawer>
      </Container>
    </header>
  );
};

export default Navbar;
