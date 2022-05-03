import { useEffect, useState } from "react";

function Select({coinArr}){
    const [sValue, setSvalue] = useState('');
    const [sinput, setInput] = useState('');
    const [cCoin, setCcoin] = useState('');
    const [selOption, setSelOption] = useState('name');
    const [selValue, setSelValue] = useState('');
    const [searchWrap, setSearchWrap] = useState('');
    const [searched, setSearched] = useState(false);
    const [notSearched, setNotSearched] = useState(false);
    const [uInut, setUinput] = useState('');
    const [coinWrap, setCoinWrap] = useState('');

    const sChange = (e) => {
        setSvalue(e.target.value);
    }
    
    const findCoin = (e) => {
        e.preventDefault();
        if(sValue && sinput){
            setCcoin(sinput/sValue)
        }
    }
    const siChange = (e) => {
        setInput(e.target.value);
    }

    const selTwo = (e) => {
        e.preventDefault();
        setUinput('');
        let changeShow = false;
        if(selValue){
            setSearchWrap(selValue);
            coinArr.map((item) => {
                if(selValue === item.name){
                    setCoinWrap(item);
                    changeShow=true;
                    setSearched(true);
                    setNotSearched(false);
                }
                if(selValue === item.symbol){
                    setCoinWrap(item);
                    changeShow=true;
                    setSearched(true);
                    setNotSearched(false);
                }
            })
        }
        if(!changeShow){
            setSearched(false);
            setNotSearched(true);
        }
    }
    const ionChange = (e) => {
        setSelValue(e.target.value);
    }
    const seloChange = (e) => {
        setSelOption(e.target.value);
    }
    const onInput = (e) => {
        setUinput(e.target.value);
    }

    return(
        <>
            <form onSubmit={findCoin}>
                <div>
                    Select: 
                    <select onChange={sChange}>
                        <option>Select Coin</option>
                        {
                            coinArr.map((item) => (
                                <option 
                                    key={item.id} 
                                    value={item.quotes.USD.price}
                                >
                                    {item.name}({item.symbol}) - $ {item.quotes.USD.price}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <label>USD: </label>
                <input 
                    type="number" 
                    placeholder="USD" 
                    onChange={siChange} 
                    value={sinput}
                />
                <button>Converter</button>
            </form>
            <div>
                <p>You can get {cCoin ?cCoin :0}</p>
            </div>
            <hr />
            <div>
                <form onSubmit={selTwo}>
                Search:
                    <select onChange={seloChange}>
                        <option value="name">name</option>
                        <option value="symbol">symbol</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder={`coin ${selOption}`} 
                        onChange={ionChange} 
                        value={selValue} 
                    />
                    <button>Find Coin</button>
                </form>
                <div>
                    {
                        searched
                        ?
                        <div>
                            <p>Calculate USD to {searchWrap}</p>
                            <input 
                                type="number" 
                                placeholder="USD" 
                                onChange={onInput} 
                                value={uInut} 
                            />
                            <p>You can get {
                                uInut 
                                ?uInut/coinWrap.quotes.USD.price  :0}
                            </p>
                        </div>
                        :null
                    }
                </div>
                <div>
                    {
                        notSearched
                        ?
                        <p>This name has not found: {searchWrap}</p>
                        :null
                    }
                </div>
            </div>
        </>
    );
}


function CoinConverter(){
    const [loading, setLoading] = useState(false);
    const [coinArr, setCoinArr] = useState([]);

    useEffect(() => {
        fetch('https://api.coinpaprika.com/v1/tickers')
            .then((response) => response.json())
            .then((json) => {
                setLoading(true);
                setCoinArr(json);
            })
    }, [])
    
    return(
        <div>
            <h1>Coin Converter</h1>
            <Select coinArr={coinArr}/>
            <div>
                <p>{loading ?null :'loading...'}</p>
                <h2>Coin List</h2>
                {
                    coinArr.map((item) => (
                        <li key={item.id}>
                            {item.name}({item.symbol}) - $ {item.quotes.USD.price}</li>
                    ))
                }
            </div>
        </div>
    );
}

export default CoinConverter;