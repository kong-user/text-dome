import React from "react";
import { DollarOutlined, CodepenOutlined } from '@ant-design/icons'
import './index.less'

const Footer = () => {
    return (
        <div className="app-footer">
            <div className="tab">
                <DollarOutlined className="icon" />
                <div>
                    Wallet
                </div>
            </div>
            <div className="tab">
                <CodepenOutlined className="icon" />
                <div>
                    Defi
                </div>
            </div>

        </div>
    )
}
export default Footer