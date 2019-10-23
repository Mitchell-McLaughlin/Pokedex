public class PokemonController {
    @AuraEnabled
    public static List<Object> getPokemon() {
        List<Object> pokemonList;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://pokeapi.co/api/v2/generation/1/');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            pokemonList = (List<Object>) results.get('pokemon_species');
        }
        return pokemonList;
    }
    @AuraEnabled(Cacheable=true)
    public static String getPokemonById(String id) {
        Map<String, Object> pokemonList;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://pokeapi.co/api/v2/pokemon/' + id + '/');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            system.debug(response.getStatusCode());
            system.debug(response.getBody());
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            pokemonList = (Map<String, Object>) results.get('sprites');
        }
        String result = (string)pokemonList.values()[4];
        return result;
    }


}