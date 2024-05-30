import "@styles/globals.css"; // No need to mention the whole path. Just put @ and folder name and the file name. Just remove the '/' from the '@/*' in the js config file.
import Nav from "@Components/Nav";
import Provider from "@Components/Provider";



export const metadata = {
    title: "Promptopia", 
    description: "An app to generate prompts"
}

function RootLayout({children}) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient"/>
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
}

export default RootLayout;
