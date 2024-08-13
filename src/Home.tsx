import Products from './components/Products/Products';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return <Products query="toilets" />;
};

export default Home;