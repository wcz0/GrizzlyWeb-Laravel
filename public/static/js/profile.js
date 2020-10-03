$(document).ready(function(){
    var nameFlag=1;
    var signatureFlag=1;
    $("#name").change(function(){
        if($(this).val().length<16){
            $(this).removeClass("is-invalid")
            nameFlag = 1;
        }else{
            $(this).removeClass("is-valid").addClass("is-invalid").siblings(".invalid-feedback").text("长度过长, 小于16位字符");
            nameFlag = 0;
        }
    })
    $("#signature").change(function(){
        if($(this).val().length<128){
            signatureFlag = 1;
            $(this).removeClass("is-invalid")
        }else{
            $(this).removeClass("is-valid").addClass("is-invalid").siblings(".invalid-feedback").text("长度过长, 小于128位字符");
            signatureFlag = 0;
        }
    })
    $("#profile-save").click(function(){
        if(!signatureFlag){
            $("#signature").removeClass("is-valid").addClass("is-invalid").siblings(".invalid-feedback").text("长度过长, 小于128位字符");
            return false;
        }
        if(!nameFlag){
            $("#name").removeClass("is-valid").addClass("is-invalid").siblings(".invalid-feedback").text("长度过长, 小于16位字符");
            return false;
        }
        $.ajax({
            type: "POST",
            url: $(this).attr("data-purl"),
            data: {
                "name" : $("#name").val(),
                "gender" : $("#gender").val(),
                "birthday" : $("#birthday").val(),
                "signature" : $("#signature").val()
            },
            success: data=>{
                if(data=="success"){
                    $("body").append(`
                        <div class="alert alert-success alert-dismissible fade show fixed-top text-center" role="alert">
                            <strong>保存成功!</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                // }else if(data=="success2"){
                //     $("body").append(`
                //         <div class="alert alert-success alert-dismissible fade show fixed-top text-center" role="alert">
                //             <strong>你并没有改变什么!</strong>
                //             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                //             <span aria-hidden="true">&times;</span>
                //             </button>
                //         </div>
                //     `);
                }else{
                    $("body").append(`
                        <div class="alert alert-danger alert-dismissible fade show fixed-top text-center" role="alert">
                            <strong>保存失败!</strong>请重试一遍
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            },
            error: ()=>{
                $("body").append(`
                <div class="alert alert-danger alert-dismissible fade show fixed-top text-center" role="alert">
                    <strong>服务器错误!</strong>请联系管理员
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              `);
            }
        })
        return false;
    })


    //profile-contact
    var qqFlag=1;
    $("#qq").change(function(){
        if($(this).val()==""){
            qqFlag=1;
            $(this).removeClass("is-invalid")
        }else{
            if(/^[1-9][0-9]{4,11}$/.test($(this).val())){
                qqFlag=1;
                $(this).removeClass("is-invalid")
            }else{
                qqFlag=0;
                $(this).removeClass("is-valid").addClass("is-invalid").siblings(".invalid-feedback").text("QQ号格式不正确");
            }
        }
    })
    $("#profile-c-save").click(function(){
        if(!qqFlag){
            $("#qq").removeClass("is-valid").addClass("is-invalid").siblings(".invalid-feedback").text("QQ号格式不正确");
            return false;
        }
        $.ajax({
            type: "POST",
            url: $(this).attr("data-purl"),
            data: {
                'qq' : $("#qq").val()
            },
            success: data=>{
                console.log(data.success)
                if(data.success){
                    $("body").append(`
                        <div class="alert alert-success alert-dismissible fade show fixed-top text-center" role="alert">
                            <strong>保存成功!</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                // }else if(data=="success2"){
                //     $("body").append(`
                //         <div class="alert alert-success alert-dismissible fade show fixed-top text-center" role="alert">
                //             <strong>你并没有改变什么!</strong>
                //             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                //             <span aria-hidden="true">&times;</span>
                //             </button>
                //         </div>
                //     `);
                }else{
                    $("body").append(`
                        <div class="alert alert-danger alert-dismissible fade show fixed-top text-center" role="alert">
                            <strong>保存失败!</strong>请重试一遍
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            },
            error: ()=>{
                $("body").append(`
                <div class="alert alert-danger alert-dismissible fade show fixed-top text-center" role="alert">
                    <strong>服务器错误!</strong>请联系管理员
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              `);
            }
        })
        return false;
    })
    
    //avatar.html
    var avatarFlag=0
    $("#avatar").change(function(){
        if($("#avatar").val()==null){
            avatarFlag=0
            $(this).removeClass("is-valid").addClass("is-invalid").siblings(".invalid-feedback").text("请选择图片");
        }else{
            avatarFlag=1;
            $(this).removeClass("is-invalid").addClass("is-valid")
        }
    })
    $("#avatar-upload").click(function(){
        if(!avatarFlag){
            $("#avatar").removeClass("is-valid").addClass("is-invalid").siblings(".invalid-feedback").text("请选择图片");
            return false
        }
        var formData = new FormData()
        formData.append("image", $("#avatar")[0].files[0])
        $.ajax({
            type: "POST",
            url: $(this).attr("data-purl"),
            data: formData,
            processData : false,
            contentType : false,
            success: data=>{
                if(data.success){
                    $("#staticBackdrop").modal('show')
                }else if(data.error.code=='003'){
                    $("body").append(`
                        <div class="alert alert-danger alert-dismissible fade show fixed-top text-center" role="alert">
                            <strong>上传失败!</strong>格式类型错误, 只允许jpg/png格式
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }else if(data.error.code){
                    $("body").append(`
                        <div class="alert alert-danger alert-dismissible fade show fixed-top text-center" role="alert">
                            <strong>上传失败!</strong>文件太大
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }else{
                    $("body").append(`
                        <div class="alert alert-danger alert-dismissible fade show fixed-top text-center" role="alert">
                            <strong>服务器错误!</strong>请联系管理员
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            },
            error: ()=>{
                $("body").append(`
                <div class="alert alert-danger alert-dismissible fade show fixed-top text-center" role="alert">
                    <strong>服务器错误!</strong>请联系管理员
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              `);
            }
        })
        return false
    })

})