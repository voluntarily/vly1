import Person from './person';

export default function () {
  Person.estimatedDocumentCount().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const peopleList = [
      new Person({ cuid: 'cikqgkv4q01ck7453ualdn5aa', name: 'ANDREW WATKINS', email: 'andrew@omgtech.co.nz', role: 'admin' }),
      new Person({ cuid: 'cikqgkv4q01ck7453ualdn5ab', name: 'WALTER LIM', email: 'walter@omgtech.co.nz', role: 'admin' }),
    ];

    Person.create(peopleList, (error) => {
      if (!error) {
//        console.log('Loaded Persons....');
      }
    });
  });
}
