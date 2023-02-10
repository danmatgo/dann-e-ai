import React, { useEffect, useState } from 'react';
import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return (
            data.map((post) => <Card key={post._id} {...post} />)
        );
    }

    return (
        <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    );
};

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/v1/post', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                setAllPosts(result.data.reverse());
            }
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
                setSearchedResults(searchResult);
            }, 500),
        );
    };

    return (
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-[#FFFFFF] text-[32px]">Muestras de la comunidad</h1>
                <p className="mt-2 text-[#B2BAC6] text-[14px] max-w-[500px]">Mira las más inspiradoras y asombrosas imágenes generadas con DANN•E. </p>
            </div>

            <div className="mt-16">
                <FormField
                    labelName="Busca dentro de la colección de imágenes."
                    type="text"
                    name="text"
                    placeholder="Escribe algo para buscar..."
                    value={searchText}
                    handleChange={handleSearchChange}
                />
            </div>

            <div className="mt-10">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {searchText && (
                            <h2 className="font-medium text-[#666e75] text-xl mb-3">
                                Mostando resultados para <span className="text-[#222328]">{searchText}</span>:
                            </h2>
                        )}
                        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                            {searchText ? (
                                <RenderCards
                                    data={searchedResults}
                                    title="No se encontraron resultados."
                                />
                            ) : (
                                <RenderCards
                                    data={allPosts}
                                    title="No hay post aún."
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Home;
