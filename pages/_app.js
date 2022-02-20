import { Container } from "semantic-ui-react";
import Footer from "../components/Footer";
import Header from "../components/Header"
import "semantic-ui-css/semantic.min.css";

const AppComponent = ({Component, pageProps})=>{
    return(
        <Container>
            <Header/>
            <Component {...pageProps}/>
        </Container>
    )
}


AppComponent.getInitialProps = async appContext => {
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    
    return {
      pageProps
    };

}


export default AppComponent
