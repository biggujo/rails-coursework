export default function HomePage() {
  return (<>
    <button onClick={() => {
      setValue((prevState) => prevState + 1);
    }}>Click me
    </button>
    <div>HomePage</div>
  </>);
};
