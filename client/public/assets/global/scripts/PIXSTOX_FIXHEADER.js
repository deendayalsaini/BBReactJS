
var Coll_PagePosionFactor=0;
var Expend_PagePosionFactor=0;

var PagePosionFactor=0;
var vheader_top_custom_val=5;
var vsub_cntrlName='PNL_Schedule';



  jQuery(window).on("scroll", function () {

try{
    if(!$(".clickable").hasClass("panel-collapsed"))
    {
        PagePosionFactor=Expend_PagePosionFactor;
    }
    else
    {
        PagePosionFactor = Coll_PagePosionFactor;
    }
        // Refreshes fixed main menu position
        var wr = jQuery(".fixedHeader_collapsetree"),
            wrfollow = jQuery(".fixedHeader_collapsetree");
        if (wr.size() > 0 && jQuery(window).scrollTop() + 110 >= (parseInt(wr.offset().top))) {

            if (!$('.gridviewtheadfixhd').hasClass("FIXEDHEADERCLASS")) {
                $('.gridviewtheadfixhd').addClass("FIXEDHEADERCLASS");

                try {
                  
                    if (vsub_cntrlName == 'PNL_Schedule' || vsub_cntrlName == 'Balance_Sheet' || vsub_cntrlName == 'Cash_Flow') {
                        $('.gridviewtheadfixhd').css("top", jQuery(window).scrollTop() - PagePosionFactor - parseInt(vheader_top_custom_val)).css("position", "relative").css("background-color", "white").css("height", "36px").css("z-index", "100").css("box-sizing", "border-box");
                    }else {
                        $('.gridviewtheadfixhd').css("top", jQuery(window).scrollTop() - PagePosionFactor + 100).css("position", "relative").css("background-color", "white").css("height", "35px").css("box-shadow", " 0 0.25em 0.1em -0.1em rgba(0,0,0,.125)").css("z-index", "100").css("box-sizing", "border-box");
                    }

                }
                catch (ex) {
                    $('.gridviewtheadfixhd').css("top", jQuery(window).scrollTop() - PagePosionFactor - 20).css("position", "relative").css("background-color", "white").css("height", "35px").css("box-shadow", " 0 0.25em 0.1em -0.1em rgba(0,0,0,.125)").css("z-index", "100").css("box-sizing", "border-box");
                }

                //$('.gridviewtheadfixhd tr').css("box-shadow", "0 3px 0 #ddd").css("vertical-align", "bottom");

            }
            else {
                try {

                    if (vsub_cntrlName == 'PNL_Schedule' || vsub_cntrlName == 'Balance_Sheet' || vsub_cntrlName == 'Cash_Flow') {
                        $('.gridviewtheadfixhd').css("top", jQuery(window).scrollTop() - PagePosionFactor - parseInt(vheader_top_custom_val));
                    } else if (vsub_cntrlName == 'Ratio' || vsub_cntrlName == 'Credit_Analytics' || vsub_cntrlName == 'Qtr_Result') {
                        $('.gridviewtheadfixhd').css("top", jQuery(window).scrollTop() - PagePosionFactor + parseInt(vheader_top_custom_val));
                    } else if (vsub_cntrlName == 'Company_Segment') {
                        $('.gridviewtheadfixhd').css("top", jQuery(window).scrollTop() - PagePosionFactor - parseInt(vheader_top_custom_val));
                    } else {
                        $('.gridviewtheadfixhd').css("top", jQuery(window).scrollTop() - PagePosionFactor - 20);
                    }

                }
                catch (ex) {
                    $('.gridviewtheadfixhd').css("top", jQuery(window).scrollTop() - PagePosionFactor - 20);
                }
            }


        } else if (wrfollow.size() > 0 && jQuery(window).scrollTop() < parseInt(wrfollow.offset().top) + 280) {
            $('.gridviewtheadfixhd').removeClass("FIXEDHEADERCLASS");

            $('.gridviewtheadfixhd').css("top", '').css("position", "").css("background-color", "").css("height", "");
            $('.gridviewtheadfixhd tr').css("box-shadow", "").css("vertical-align", "");
        }
    }catch(ex)
    {
    }
    });
