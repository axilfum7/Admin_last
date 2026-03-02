import { Route, Routes } from "react-router-dom"
import { Category, DashboardHome, Notfound, Products, ProductsCrud, ProductsMore, Users, UserMore, UserCrud, CategoriesCrud, CategoriesMore } from "../pages"
import { PATH } from "../components"
import { Header, Sitebar } from "../modules"

const DashboardRoute = () => {
    const routeList = [
        { id: 1, path: PATH.home, element: <DashboardHome /> },
        { id: 2, path: PATH.products, element: <Products /> },
        { id: 3, path: PATH.category, element: <Category/> },
        { id: 4, path: PATH.users, element: <Users /> },
        { id: 5, path: PATH.usersMore, element: <UserMore /> },
        { id: 6, path: PATH.usersCreate, element: <UserCrud /> },
        { id: 7, path: PATH.usersUpdate, element: <UserCrud /> },
        { id: 8, path: PATH.notFound, element: <Notfound /> },
        { id: 9, path: PATH.productsMore, element: <ProductsMore /> },
        { id: 10, path: PATH.productsCreate, element: <ProductsCrud /> },
        { id: 11, path: PATH.productsUpdate, element: <ProductsCrud /> },
        { id: 12, path: PATH.categoriesMore, element: <CategoriesMore /> },
        { id: 13, path: PATH.categoriesCreate, element: <CategoriesCrud /> },
        { id: 14, path: PATH.categoriesUpdate, element: <CategoriesCrud /> },
    ]
    return (
        <div className="flex">
            <Sitebar />
            <div className="w-[78%] relative h-screen bg-[#0b1220] bg-[radial-gradient(900px_circle_at_20%_25%,rgba(255,115,0,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(255,0,107,0.12),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(96,165,250,0.10),transparent_55%)] overflow-y-auto">
                <Header />
                <Routes>
                    {routeList.map(item => <Route key={item.id} path={item.path} element={item.element} />)}
                </Routes>
            </div>
        </div>
    )
}

export default DashboardRoute