import React, { useEffect, useState } from "react";
import { Button } from 'antd'
import { SwapRightOutlined, SwapLeftOutlined } from '@ant-design/icons'
import { getCurren, getliveRates, getWallet } from "../../api";
import logo from '@/assets/logo.png';
import './index.less'
import { getTotalBalanceInUSD } from "../../until";


const AssetList = () => {
    const [usdtotal, setUsdtotal] = useState(169.36)
    const [assetList, setAssetList] = useState<any>([])
    const getdata = async () => {
        const currenRes = await getCurren()
        const liveRatesRes = await getliveRates()
        const WalletRes = await getWallet()
        //如果涉及到大量计算，可使用web worker进行优化。避免主线程阻塞
        const worker = new Worker(new URL('@/worker/index.js', import.meta.url), { type: 'module' });
        worker.postMessage([currenRes, liveRatesRes, WalletRes]);

        worker.onmessage = (e) => {
            const data = e.data;
            //计算usd总量
            const total= getTotalBalanceInUSD(data)
            setUsdtotal(total)
            setAssetList(data)
        }
        
    }
    useEffect(() => {
        let stopped = false
        //开启轮询调用接口，实时更新数据。
        const poll = async () => {
            if (stopped) return
            await getdata()
            setTimeout(poll, 2000)
        }

        poll()

        return () => {
            stopped = true
        }
    }, [])
    return (
        <div className="app-asset">
            <div className="asset-info">
                <div className="title">
                    <img src={logo} className="logo" />
                    <div className="url">crypho.com</div>
                    <div className="line" />
                    <div className="type"> DEFI WALLET</div>
                </div>
                <div className="usdt">
                    $
                    <span className="count">{usdtotal}</span> USD
                </div>
                <div className="feature">
                    <div className="feature-box">
                        <Button type="primary" className="btn" shape="circle" icon={<SwapRightOutlined className="icon" />} />
                        <div className="text">Send</div>
                    </div>
                    <div className="feature-box">
                        <Button type="primary" className="btn" shape="circle" icon={<SwapLeftOutlined className="icon" />} />
                        <div className="text">Receive</div>
                    </div>
                </div>
            </div>
            <div className="asset-list">
                {
                    assetList.map(item => {
                        return <div className="asset-item">
                            <div className='left'>
                                <img src={item?.colorful_image_url} className="icon" />
                                <div className="asset-name">
                                    {item?.name}
                                </div>
                            </div>
                            <div className='right'>
                                <div className="asset-count">
                                    {item?.balance} {item?.symbol}
                                </div>
                                <div className="asset-dor">
                                    ${(Number(item?.balance) * Number(item?.exchangeRate)).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default AssetList