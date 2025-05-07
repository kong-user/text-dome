import { FixedSizeList as List } from 'react-window';
import React from 'react';

const AssetItem = ({ index, style, data }) => {
    const item = data[index];

    return (
        <div style={{ ...style, paddingBottom: 16 }}>
            <div className="asset-item">
                <div className="left">
                    <img src={item?.colorful_image_url} className="icon" />
                    <div className="asset-name">{item?.name}</div>
                </div>
                <div className="right">
                    <div className="asset-count">
                        {item?.balance} {item?.symbol}
                    </div>
                    <div className="asset-dor">
                        ${(Number(item?.balance) * Number(item?.exchangeRate)).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AssetVirtualList = ({ assetList }) => {
    const itemSize = 80; // 根据你的样式设置每项高度（px）
    const listHeight = 400; // 可视区域高度
    const listWidth = '100%'; // 或具体像素值

    return (
        <List
            height={listHeight}
            itemCount={assetList.length}
            itemSize={itemSize}
            width={listWidth}
            itemData={assetList}
        >
            {AssetItem}
        </List>
    );
};