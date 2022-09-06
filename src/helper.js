export const getProductByID = ({ id, products }) => {
        if (products.length) {
                const found = products.find(
                        (product) => product.product_id === id
                );
                return found;
        }
};
export const getUserByID = ({ id, users }) => {
        if (users.length) {
                const found = users.find((user) => user.user_id === id);
                return found;
        }
};
