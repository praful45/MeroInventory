import React from "react";
import { Routes, Route } from "react-router-dom";
import Category from "../../components/CategoryList";
import CategoryAdd from "../../components/CategoryAdd";
import CategoryListEdit from "../../components/CategoryListEdit";
import CategoryListDelete from "../../components/CategoryListDelete";
import DashBoard from "../../components/Dashboard";
import ProductAdd from "../../components/ProductAdd";
import ProductList from "../../components/ProductList";
import ProductEdit from "../../components/ProductEdit";

const InvRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category-add" element={<CategoryAdd />} />
        <Route path="/category-edit" element={<CategoryListEdit />} />
        <Route path="/category-delete" element={<CategoryListDelete />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/product-add" element={<ProductAdd />} />
        <Route path="/product" element={<ProductList/>} />
        <Route path="/product-edit" element={<ProductEdit />} />
      </Routes>
    </>
  );
};

export default InvRoutes;
