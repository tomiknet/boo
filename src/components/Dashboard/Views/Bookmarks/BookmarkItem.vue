<template>
    <div class="row">
        <div class="col-lg-9 col-sm-12">
        <div class="card">
            <form method="#" action="#">
            <div class="card-header">
                <h4 class="card-title">
                New Bookmark
                </h4>
            </div>
            <div class="card-content">
                <div class="form-group">
                    <label>Bookmark title</label>
                    <div>
                    <input type="text"
                            name="bookmarkTitle"
                            data-vv-as="Bookmark title"
                            placeholder="Enter a title"
                            v-validate="modelValidations.bookmarkTitle"
                            v-model="model.bookmarkTitle"
                            class="form-control">
                    <small class="text-danger" v-show="bookmarkTitle.invalid">
                        {{ getError('bookmarkTitle') }}
                    </small>
                    </div>
                </div>
                <div class="form-group">
                <label>Bookmark URL</label>
                    <div>
                    <input type="text"
                            name="bookmarkUrl"
                            data-vv-as="Bookmark URL"
                            placeholder="Enter an url address"
                            v-validate="modelValidations.bookmarkUrl"
                            v-model="model.bookmarkUrl"
                            class="form-control">
                    <small class="text-danger" v-show="bookmarkUrl.invalid">
                        {{ getError('bookmarkUrl') }}
                    </small>
                    </div>
                </div>
                <div class="form-group">
                <label>Bookmark image</label>
                    <div>
                    <input type="text"
                            name="bookmarkImage"
                            data-vv-as="Bookmark image"
                            placeholder="Enter an image url address"
                            v-validate="modelValidations.bookmarkImage"
                            v-model="model.bookmarkImage"
                            class="form-control">
                    <small class="text-danger" v-show="bookmarkImage.invalid">
                        {{ getError('bookmarkImage') }}
                    </small>
                    </div>
                </div>      
                <div class="form-group">
                <label>Bookmark description</label>
                <textarea class="form-control" v-model="model.bookmarkDesc" placeholder="Enter short text about the bookmark" rows="3"></textarea>
                </div>     
                <div class="form-group">
                <label>Tags</label>
                    <el-tag
                    :key="tag"
                    v-for="tag in model.tags.dynamicTags"
                    type="primary"
                    :closable="true"
                    :close-transition="false"
                    @close="handleClose(tag)"
                    >
                    {{tag}}
                    </el-tag>

                    <input type="text" placeholder="Add new tag" class="form-control input-new-tag"
                        v-model="model.tags.inputValue"
                        ref="saveTagInput"
                        size="mini"
                        @keydown.enter.prevent="handleInputConfirm"
                        @blur="handleInputConfirm"/>
                </div> 
                <p-checkbox v-model="model.bookmarkPublic">Visible for everyone</p-checkbox>    

                <v-btn @click.prevent="validate" color="#7a9e9f" class="white--text" round depressed>Submit</v-btn>
            </div>
            </form>
        </div> <!-- end card -->
        </div> <!--  end col-md-12  -->
        <div class="col-lg-3 col-sm-12">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                Image
                </h4>
            </div>
            <div class="card-content"> 
                <div class="image-placer">
                    <img v-show="model.bookmarkImage" :src="model.bookmarkImage">
                </div>
                <br />
                <v-btn @click.prevent="imagize" color="#7a9e9f" class="white--text" round depressed :loading="loading4" :disabled="loading4">
                <v-icon style="font-size: 14px;">fas fa-sync-alt</v-icon>&nbsp; Create new image
                <span slot="loader" class="custom-loader" >
                <v-icon style="font-size: 14px;">fas fa-sync-alt</v-icon>
                </span>
                </v-btn>

            </div>     
        </div> <!-- end card -->
        </div> <!--  end col-md-12  -->                  
    </div>

</template>
<script>
import {mapFields} from 'vee-validate'
import {Tag} from 'element-ui'
  export default {

    components: {
          [Tag.name]: Tag,
    },

    data () {
      return {
        loader: null,
        loading4: false,
        model: {
          bookmarkTitle: '',
          bookmarkUrl: '',
          bookmarkImage: '',
          bookmarkDesc: '',
          bookmarkPublic: false,
            tags: {
                dynamicTags: [],
                inputVisible: false,
                inputValue: ''
            },  
        },
        modelValidations: {
            bookmarkTitle: {
                required: true
            },
            bookmarkUrl: {
                url: true,
                required: true
            },          
            bookmarkImage: {
                url: true,
                required: true
            },    
        },

    

      }
    },
    computed: {
        ...mapFields(['bookmarkTitle','bookmarkUrl','bookmarkImage']),
    },
    methods: {
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate() {
        this.$validator.validateAll().then(isValid => {
          if(isValid == true){
          //this.$emit('on-submit', this.model, isValid)
          this.$store.dispatch('addBookmark', {
                bookmarkTitle: this.model.bookmarkTitle,
                bookmarkUrl: this.model.bookmarkUrl,
                bookmarkImage: this.model.bookmarkImage,
                bookmarkDesc: this.model.bookmarkDesc,
                bookmarkTags: this.model.tags,
                bookmarkPublic: this.model.bookmarkPublic
              });
          }
        })
      },

      imagize() {
          this.loader = 'loading4';
          this.loading4 = true;
          if(this.model.bookmarkUrl.length > 0){
              this.$store.dispatch('createImage', {
                bookmarkUrl: this.model.bookmarkUrl
              }).then(response => {
                this.model.bookmarkImage = response;
                this.loader = null;
                this.loading4 = false;
              }, error => {
                console.error(error)
              });
          } else {
            this.$notify({
                component: {
                template: `<span>Enter Bookmark URL first.</span>`
                },
                icon: 'ti-alert',
                horizontalAlign: 'center',
                verticalAlign: 'top',
                type: 'danger'
            })
            this.loader = null;
            this.loading4 = false;
          }

      },      

      handleClose (tag) {
        this.model.tags.dynamicTags.splice(this.model.tags.dynamicTags.indexOf(tag), 1)
      },

      showInput () {
        this.model.tags.inputVisible = true
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm () {
        let inputValue = this.model.tags.inputValue
        if (inputValue) {
          this.model.tags.dynamicTags.push(inputValue)
        }
        this.model.tags.inputVisible = false
        this.model.tags.inputValue = ''
      },      
    },
   
  }
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
