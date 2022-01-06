import { Helmet, HelmetProvider } from 'react-helmet-async';
import favicon from 'assets/images/icon/favicon.png'

function MetaHeader() {
    return ( 
        <>
            <HelmetProvider>
                <Helmet>
                    <title>eFishery</title>
                    <link rel="icon" type="image/ico" sizes="32x32" href={favicon} />
                </Helmet>
            </HelmetProvider>
        </>
     );
}

export default MetaHeader;