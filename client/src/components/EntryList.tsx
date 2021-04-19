interface Entry {
  id: number;
  value: number;
  description: string;
}

interface EntryListProps {
  data?: Entry[];
}

const EntryList = (props: EntryListProps) => {
  return (
    <>
      <h2>Entry List</h2>
      {props.data ? (
        props.data.map((el) => (
          <div
            style={{ width: '50%', textAlign: 'center', margin: '1rem 0' }}
            key={el.id}
          >
            {el.description}
            <br />
            {el.value.toFixed(2)}
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default EntryList;
