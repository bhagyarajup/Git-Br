public class simpleBindingSoqlQuery {
  public static List<Account> simpleBindingSoqlQueryMeth(Map<String, Object> bindParams) {
    String queryString =
        'SELECT Id, Name ' +
        'FROM Account ' +
        'WHERE name = :name';
    return Database.queryWithBinds(
        queryString,
        bindParams,
        AccessLevel.USER_MODE
    );
}
    /*
String accountName = 'Acme Inc.';
Map<String, Object> nameBind = new Map<String, Object>{'name' => accountName};
List<Account> accounts = simpleBindingSoqlQueryMeth(nameBind);
System.debug(accounts);
*/
}