import { useLoaderData } from "@remix-run/react";
import { Card, Layout, List, Page } from "@shopify/polaris";
import { authenticate,apiVersion} from "../shopify.server";


export const query =`
{
    products(first: 10){
        edges{
            node{
                id
                handle
                title
                description
            }
        }
        pageInfo {
            hasNextPage
        }
    }
}
`


export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request)
    const {shop, accessToken } = session;

    try{

        const response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/graphql",
                "X-Shopify-Access-Token": accessToken
            },
            body: query

        });

        if(response.ok){
            const data = await response.json()

            const {
                data: {
                    products: { edges }  
                }
            } = data;
            return edges
        }

        return null

    } catch(err){
        console.log(err)
    }

}


const Collections = () => {
    const products = useLoaderData()
    console.log(products, 'products')

  return (
  <Page>
    <Layout>
        <Layout.Section>
            <Card><h1>hello world</h1></Card>
        </Layout.Section>
        <Layout.Section>
            <Card>
                h1llo
                <List type="bullet" gap="loose">
                    {
                        products?.map((edge) => {
                            const {node: products } = edge;
                            return (
                                <List.Item key={products.id}>
                                    <h2>{products.title}</h2>
                                    <h2>{products.description}</h2>
                                </List.Item>
                            )
                        })
                    }

                </List>
            </Card>

        </Layout.Section>
    </Layout>
</Page>
  );
};

export default Collections;