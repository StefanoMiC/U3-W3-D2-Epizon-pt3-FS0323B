import { Component } from "react";
import { connect } from "react-redux";
import { setAdminAction } from "../redux/actions";

// connect è la funzione di alto livello (HOF - higher order function ) che connette il nostro componente allo Store, lo sottoscrive ad ogni cambiamento di stato
// questa funzione vuole due parametri (mapStateToProps, mapDispatchToProps)

// questi parametri "mapperanno" cioè applicheranno delle prop al nostro componente a classe
// il quale avrà sia prop riguardanti la porzione di stato che vogliamo leggere,
// sia la funzione che sarà in grado di aggiornare lo stato con una dispatch dell'azione corrispondente

const mapStateToProps = state => {
  // questa funzione viene chiamata dalla connect, e riceve lo stato globale nel suo parametro,
  // questo ci permette di estrarre i valori nella porzione di stato che ci interessa

  // li riceviamo attraverso la prop che si chiamerà con lo stesso nome che noi diamo alla proprietà di questo oggetto ritornato
  return { cartLength: state.cart.content.length, adminName: state.admin.content, nomeUtente: state.user.content };
};

const mapDispatchToProps = dispatch => {
  // questa funzinoe riceve la funzione dispatch dal suo parametro, regalato dalla connect

  // anche qui ritorneremo sempre un oggetto che rappresenta le props che verranno applicate al componente, in questo caso avremo this.props.setAdmin
  // this.props.setAdmin è una funzione! serve a ritardare l'effettiva chiamata di dispatch()

  // bisognerà a questo punto passare il valore di payload attraverso il parametro della nostra funzione setAdmin (contenuta nelle props)
  // una volta chiamata this.props.setAdmin(parametro) la dispatch interna avrà quello che le serve per funzionare

  return {
    setAdmin: str => {
      // dispatch({ type: SET_ADMIN, payload: str });
      dispatch(setAdminAction(str));
    }
  };
};

class Footer extends Component {
  render() {
    return (
      <footer className="epizon-footer" onClick={() => this.props.setAdmin("Stefano")}>
        <h4>Admin: {this.props.adminName}</h4>
        <h4>User: {this.props.nomeUtente}</h4>
        <span className="text-muted">Epizon {new Date().getFullYear()}©</span>
        <span>Cart content: {this.props.cartLength}</span>
      </footer>
    );
  }
}

// questo passaggio è fondamentale, è qui che la funzione connect() aumenterà il nostro componente con delle prop
// prop riguardanti lo stato, e prop per fare le nostre dispatch,
// il nome delle prop (e quello che fanno), dipenderà dalle funzione mapStateToProps e mapDispatchToProps che creiamo noi e che passiamo come argomenti della funzione connect
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
