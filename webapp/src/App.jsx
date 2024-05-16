import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Body from "./layout/Body";
import React from "react";
import { Container } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import AppProvider from "./providers/AppProvider";
import QuestionProvider from "./providers/QuestionProvider";
import DialogueProvider from "./providers/DialogueProvider";

function App() {
    return (
        <Container
            className="App"
            maxW={"100%"}
            w={"100%"}
            // bg={"gray.50"}
            m={0}
            p={0}
        >
            <BrowserRouter>
                <AuthProvider>
                    <Header />
                    <AppProvider>
                        <QuestionProvider>
                            <DialogueProvider>
                                <Body />
                            </DialogueProvider>
                        </QuestionProvider>
                    </AppProvider>
                    <Footer />
                </AuthProvider>
            </BrowserRouter>
        </Container>
    );
}

export default App;
