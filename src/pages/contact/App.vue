<template>
  <div id="app">
    <cascad-menu :leftMenu="leftMenu" :rightMenu="rightMenu"></cascad-menu>
  </div>
</template>

<script>
import axios from 'axios'
import Scroll from './components/scroll.vue'
import CascadMenu from './components/cascad-menu.vue'
import Barousel from './components/barousel.vue'
import TranslateForm from './components/TranslateForm'
import TranslateOutput from './components/TranslateOutput'

export default {
  name: 'app',
  components: {
    TranslateForm,
    TranslateOutput,
    Barousel,
    CascadMenu,
    Scroll
  },
  data () {
    return {
      leftMenu: ['菜单1', '菜单2', '菜单3', '菜单4', '菜单5', '菜单6', '菜单7', '菜单8', '菜单9', '菜单1', '菜单2', '菜单3', '菜单4', '菜单5',],
      rightMenu: [
        {
          title: '菜单1',
          data: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9]
        },
        {
          title: '菜单2',
          data: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9]
        },
        {
          title: '菜单3',
          data: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6]
        },
        {
          title: '菜单4',
          data: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9]
        },
        {
          title: '菜单5',
          data: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6]
        },
        {
          title: '菜单6',
          data: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6]
        },
        {
          title: '菜单7',
          data: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9]
        },
        {
          title: '菜单8',
          data: [2.1, 2.2, 2.3, 2.4, 2.5]
        },
        {
          title: '菜单9',
          data: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6]
        },
        {
          title: '菜单1',
          data: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9]
        },
        {
          title: '菜单2',
          data: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9]
        },
        {
          title: '菜单3',
          data: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6]
        },
        {
          title: '菜单4',
          data: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9]
        },
        {
          title: '菜单5',
          data: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6]
        }
      ],
      translatedText: "",
      list: [],
      pullup: true
    }
  },
  methods: {
    setData() {
      let list = [];
      for(let i = 0 ; i < 9;i++){
        list.push({
          title: i,
          src: 'static/img/'+i+'.jpg'
        })
      }
      return list;
    },
    sliderClick (i) {
      alert(i);
    },
    translateText: function(text, language) {
      axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170929T110341Z.55bdd4c0d6e2af6d.43b4aec6bcf42c014f55519bfb6201d768302be9&lang='+ language + '&text=' + text)
      .then(response => {
          console.log(response.body.text[0]);
          this.translatedText = response.body.text[0];
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 100px; */
}
.barousel {
  margin: 0 auto;
  width: 1000px;
}
li {
  list-style: none;
  height: 60px;
}
.content {
  height: 100%;
  overflow: hidden;
}
.name {
  line-height: 60px;
  text-align: left;
}
</style>
