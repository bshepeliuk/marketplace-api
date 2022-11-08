export const getBrandIdByTitle = ({ title, brands }) => {
  const brand = brands.find((brand) => {
    return title.toLowerCase().includes(brand.name.toLowerCase());
  });

  return brand.id;
};
