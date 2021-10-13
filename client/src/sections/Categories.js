import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import Category from '../components/Category';

function Categories () {
    const [categories, setCategories] = useState([]);

    useEffect(async () => {
        const res = await fetch('/api/categories');
        setCategories(await res.json());
    }, []);

    return (
        <section className="category-section" id='category'>
            <Title>CATEGORIES</Title>
            <div className="category-wrapper">
                <div className="category-content">
                    {categories.map((c, index) =>
                        <Category key={index} category={c} />
                    )}
                </div>
            </div>
        </section>
    );
}

export default Categories;
