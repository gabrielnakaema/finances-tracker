import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

interface Entry {
  id: number;
  value: number;
  description: string;
  date: string;
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
            style={{
              width: '50%',
              margin: '1rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '7rem',
              borderStyle: 'solid',
              borderWidth: '1px',
              textAlign: 'center',
            }}
            key={el.id}
          >
            {el.description}
            <br />
            {el.value.toFixed(2)}
            <br />
            {format(parseISO(el.date), 'MMM dd, yyyy')}
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default EntryList;
