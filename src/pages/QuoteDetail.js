import { Fragment, useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from '../lib/api';

import Comments from "../components/comments/Comments";
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/UI/LoadingSpinner";


function QuoteDetail () {
    const  {quoteID } = useParams();
    const match = useRouteMatch();

    const {sendRequest, status, data: loadedQuotes, error} = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteID);
    }, [sendRequest, quoteID]);

    if (status === 'pending') {
        return <div className="centered">
            <LoadingSpinner />
        </div>
    }
    if (error) {
        return <p className="centered">{error}</p>
    }

    

    if (!loadedQuotes.text) {
        return <p>No quote found</p>
    }

    return (
        <Fragment>
            <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author}/>
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link> 
                </div>
            </Route>
            
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
        
    )
}

export default QuoteDetail;
