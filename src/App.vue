<template >
  
  <div id="app" class="container">
    <h1 class="center">Bem vindo </h1>

    <b-alert
      show
      dismissible
      v-for="mensagem in mensagens"
      :key="mensagem.texto"
      :variant="mensagem.tipo"
      >{{ mensagem.texto }}</b-alert
    >

    <b-card>
      <b-form-group label="Nome" class="alinhar">
        <b-form-input
          type="text"
          size="lg"
          v-model="produto.nome"
          placeholder="Informe o nome"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Categoria" class="alinhar">
        <b-form-input
          type="text"
          size="lg"
          v-model="produto.categoria"
          placeholder="Informe a categoria"
        ></b-form-input>
      </b-form-group>
      <hr />
      <b-button @click="salvar" size="lg" variant="primary">Salvar</b-button>
      <b-button @click="obterProdutos" size="lg" variant="success" class="ml-2">
        Ver Produtos
      </b-button>
    </b-card>
    <hr />
    <b-list-group>
      <b-list-group-item v-for="(produto, id) in produtos" :key="id">
        <strong>Nome: </strong>{{ produto.nome }} <br />
        <strong>Categoria: </strong>{{ produto.categoria }} <br />
        <strong>ID: </strong>{{ produto.id }} <br />

        <b-button variant="warning" size="lg" @click="editar(id)"
          >Carregar</b-button
        >

        <b-button
          variant="danger"
          size="lg"
          class="ml-2"
          @click="excluir(produto.id)"
          >Excluir</b-button
        >
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
export default {
  /*created(){
    this.$http.post('produto', {
      nome: 'teste2',
      categoria: 'teste2'
    }).then(res => console.log(res))
  }*/

  data() {
    return {
      mensagens: [],
      produtos: [],

      produto: {
        nome: "",
        categoria: "",
      },
    };
  },
  methods: {
    salvar() {
      const metodo = this.id ? "patch" : "post";
      const finalUrl = this.id ? `/${this.id}` : ``;
      this.$http[metodo](`/produto${finalUrl}`, this.produto).then(() => {
        this.limpar();
        this.mensagens.push({
          texto: " Operação realizada com sucesso!!",
          tipo: "success",
        });
      });

      console.log(this.produto);
    },
    obterProdutos() {
      this.$http("produto").then((res) => {
        this.produtos = res.data;
        console.log(this.produtos);
      });
    },
    editar(id) {
      this.id = id;
      this.produto = { ...this.produtos[id] };
    },
    excluir(id) {
      if (confirm("COnfirma a exclusão ?")) {
        this.$http.delete(`produto/${id}`).then(() => this.limpar())
        .then(()=> this.limpar())
        .catch(() =>{
          this.mensagens.push({
            texto:'Produto excluido!!',
            tipo: 'success'
            
          })
          
        })
     
      }
     this.$forceUpdate()
    },
    limpar() {
      this.produto.nome = "";
      this.produto.categoria = "";
      this.id = null;
      this.mensagens = [];
    },
    atualizar(){

    }
  }
};
</script>
<style>
.ml-2 {
  margin-left: 10px;
}

.container{

text-align: center;

}
.alinhar{
  text-align: left;
}
</style>
