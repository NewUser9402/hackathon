import React from "react";
import { styled, Theme } from "@material-ui/core/styles";

import MenuBar from "./components/MenuBar/MenuBar";
import MobileTopMenuBar from "./components/MobileTopMenuBar/MobileTopMenuBar";
import PreJoinScreens from "./components/PreJoinScreens/PreJoinScreens";
import ReconnectingNotification from "./components/ReconnectingNotification/ReconnectingNotification";
import Room from "./components/Room/Room";

import useHeight from "./hooks/useHeight/useHeight";
import useRoomState from "./hooks/useRoomState/useRoomState";
import useVideoContext from "../src/hooks/useVideoContext/useVideoContext";

const Container = styled("div")({
  display: "grid",
  gridTemplateRows: "1fr auto"
});

const Main = styled("main")(({ theme }: { theme: Theme }) => ({
  overflow: "hidden",
  paddingBottom: `${theme.footerHeight}px`, // Leave some space for the footer
  background: "black",
  [theme.breakpoints.down("sm")]: {
    paddingBottom: `${theme.mobileFooterHeight + theme.mobileTopBarHeight}px` // Leave some space for the mobile header and footer
  }
}));

export default function App() {
  const roomState = useRoomState();
  const { room } = useVideoContext();

  // Here we would like the height of the main container to be the height of the viewport.
  // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
  // not the viewport. This looks bad when the mobile browsers location bar is open.
  // We will dynamically set the height with 'window.innerHeight', which means that this
  // will look good on mobile browsers even after the location bar opens or closes.
  const height = useHeight();

  const sendMessage = () => {
    let phoneNumbers: String[] = [];
    room.participants.forEach(participant => {
      if (participant.identity && participant.identity.split("~~~").length) {
        phoneNumbers.push(participant.identity.split("~~~")[1]);
      }
    });

    console.log(phoneNumbers);
    fetch("https://aktivate-2788-dev.twil.io/sendMessage", {
      method: "POST",
      body: JSON.stringify([{ Text: "x" }]),
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Container style={{ height }}>
      {roomState === "disconnected" ? (
        <PreJoinScreens />
      ) : (
        <Main>
          <ReconnectingNotification />
          <MobileTopMenuBar />
          <Room />
          <MenuBar sendMessage={sendMessage} />
        </Main>
      )}
    </Container>
  );
}
