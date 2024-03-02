import { useQueryParams } from './useQueryParams';

type MyType = {
  toString: () => string;
};

const TestComponent = () => {
  //should be string
  const [stringFilter] = useQueryParams('userGroupFilter');
  const stringCheck: string = stringFilter!;

  //should be string array
  const [numberFilter] = useQueryParams<number>('userGroupFilter', parseInt);
  const numberCheck: number = numberFilter!;
  //should be string array
  const [stringArrayFilter] = useQueryParams<string[]>('userGroupFilter', (p) =>
    p.split(',')
  );
  const stringArrayCheck: string[] = stringArrayFilter!;

  //should be custom type
  const [myTypeFilter] = useQueryParams<MyType>(
    'userGroupFilter',
    () => ({} as MyType)
  );
  const myTypeCheck: MyType = myTypeFilter!;

  //should give error that no parseFunction is given
  //(when T is not string)

  //TS IGNORE FOR LINTER
  //@ts-ignore
  const [noGetErrorNumberFilter] = useQueryParams<number>('userGroupFilter');
  //@ts-ignore
  const [noGetErrorArrayFilter] = useQueryParams<string[]>('userGroupFilter');

  //should not give error? => seems like no solution
  //@ts-ignore
  const [typedStringFilter] = useQueryParams<string>('userGroupFilter');
  //should behave same as
  const [untypedStringFilter] = useQueryParams('userGroupFilter');
};
