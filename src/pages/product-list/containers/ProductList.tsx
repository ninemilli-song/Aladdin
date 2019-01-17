import * as React from 'react';

class ProductList extends React.Component<any, any> {
    prefixCls = 'product-list';

    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className={`${this.prefixCls}`}>
                <div className={`${this.prefixCls}-header`}>
                    aaa
                </div>
                <div className={`${this.prefixCls}-filter`}></div>
                <div className={`${this.prefixCls}-table`}></div>
            </div>
        )
    }
}

export default ProductList;
