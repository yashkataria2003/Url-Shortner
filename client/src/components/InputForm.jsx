import React, { useState } from "react";
import axios from 'axios';
import { useClipboard } from "@chakra-ui/react";
import './inputFrom.css'

export const InputForm = () => {
    const [input, setInput] = useState(
        {
            longUrl: "",
            urlCode: ""
        }
    );
    const [url, setUrl] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { hasCopied, onCopy } = useClipboard(url);
    const clientBaseUrl = window.location.href;

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInput({ ...input, [id]: value });
        setIsError(false);
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (!input.longUrl) {
            setIsError(true);
            setUrl("Please add a URL");
            return;
        }
        setIsloading(true);
        axios.post('/api/url/shorten', input)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    let createUrl = clientBaseUrl + data.urlCode;
                    setUrl(createUrl);
                }
                console.log("res", res);
                setIsloading(false);
            })
            .catch(error => {
                let errorMsg = error.response.data.error;
                setUrl(errorMsg);
                console.log("error", errorMsg);
                setIsloading(false);
            });
    };

    return (
        <div className="inputFormMainContainer">
            <h2 className="form1Heading">Convert long URLs into shortened versions with a single click.</h2>
            <form action="" method="post" className="form1">
                <input
                    type="url"
                    id="longUrl"
                    value={input.longUrl}
                    placeholder="Paste here your long URL"
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                    className="inputLongURl"
                />
                {!isError ? (
                    <p className="input1Indicator">Enter your Long Url</p>
                ) : (
                    <p className="input1Indicator">URL is required.</p>
                )}
            </form>
            <h2 className="form1Heading">Create personalized and memorable links for your URLs (Optional)</h2>
            <form action="" method="post" className="form2">
                <lable>{clientBaseUrl}</lable>
                <input 
                    type="text" 
                    id="urlCode"
                    className="inputShortUrl" 
                    placeholder="your personalized code" 
                    value={input.urlCode} 
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                />
            </form>

            <button type="submit" className="submitButton" onClick={handleSubmit}>
                {isLoading ? 'Submitting' : 'Submit'}
            </button>

            {
                url && 
                    <div className="responseDiv">
                        <input className="inputShortUrl" value={url} readonly placeholder="Short Url"/>
                        <button className="copyButton" onClick={onCopy}>
                            {hasCopied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
            }
        </div>
    );
}


