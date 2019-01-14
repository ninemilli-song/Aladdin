import * as React from 'react';

class ProductList extends React.Component<any, any> {
    prefixCls = 'product-list';

    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className={`${this.prefixCls}`}>
                Hello product-list page!!!
            </div>
        )
    }
}

export default ProductList;
