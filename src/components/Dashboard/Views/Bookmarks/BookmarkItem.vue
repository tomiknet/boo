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


                <button type="submit" @click.prevent="validate" class="btn btn-fill btn-info">Submit</button>
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
                    <img :src="model.bookmarkImage">
                </div>
                <br />
                <button @click.prevent="imagize" type="button" class="btn btn-wd btn-info btn-fill btn-magnify">
	              <span class="btn-label">
	              <i class="fas fa-sync-alt"></i>
	              </span>
                Create new image
              </button>
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
        ...mapGetters({
            model.bookmarkImage: 'newImage'
        })

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

          if(this.model.bookmarkUrl.length > 0){
          this.$store.dispatch('createImage', {
                bookmarkUrl: this.model.bookmarkUrl
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
    }    
  }
</script>
<style>
</style>
