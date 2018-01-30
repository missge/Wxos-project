<template>
	<div class="Ehomebox">
		<div class="Ehome" :class="{'shows':isShows}">
			<div class="Ehome_boxs">
				<div class="Ehome_toolbar " >
					<div class="toolbar_search">
						<input type="" name="" @focus="isShowFn()">
						<span class="toolbar_searchBox" >
							<img src="./img/search.png" width="14px" height="14px">
							 搜索 
						 </span>
					</div>
				</div>
				<ul>
				
					<li  v-for="items in dataList">
						<div class="Ehome_swiper " v-if="items.floor==1">
							<mt-swipe  :auto="2500">
							  <mt-swipe-item :show-indicators="false" v-for="(firstItem,key) in items.weChatPages" :key='key'>
									<img :src="firstItem.picUrl" @click="linkUrlFn(firstItem.linkUrl)" class="img-responsive">
							  </mt-swipe-item>
							</mt-swipe>
						</div>
						
						<div class="Ehome_navbar " v-if="items.floor==2">
							<ul class="flex">
								<li v-for="(secondItem,index) in items.weChatPages">
									<img :src="secondItem.picUrl" @click="linkUrlFn(secondItem.linkUrl)" class="img-responsive">
								</li>
							</ul>
						</div>

						<div class="Ehome_navbar " v-if="items.floor==3">
							<ul class="flex">
								<li v-for="(thirdItem,index) in items.weChatPages">
									<img :src="thirdItem.picUrl" @click="linkUrlFn(thirdItem.linkUrl)" class="img-responsive">
								</li>
							</ul>
						</div>
						
						<div class="Ehome_oneimg margin_bot" v-if="items.floor==4">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>

						<div class="Ehome_oneimg margin_bot" v-if="items.floor==5">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						
						<div v-if="items.floor==6" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(sixthItem,index) in items.weChatPages">
									<img :src="sixthItem.picUrl" @click="linkUrlFn(sixthItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>
						<div class="Ehome_Twoimg flex margin_bot" v-if="items.floor==7">
							<li class="flex-center" v-for="(seventhItem,index) in items.weChatPages">
								<img :src="seventhItem.picUrl"  @click="linkUrlFn(seventhItem.linkUrl)" class="img-responsive">
							</li>
						</div>
						<div v-if="items.floor==8" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(eighthItem,index) in items.weChatPages">
									<img :src="eighthItem.picUrl" @click="linkUrlFn(eighthItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>
						<div class="Ehome_Twoimg flex margin_bot" v-if="items.floor==9">
							<li class="flex-center" v-for="(ninthItem,index) in items.weChatPages">
								<img :src="ninthItem.picUrl"  @click="linkUrlFn(ninthItem.linkUrl)" class="img-responsive">
							</li>
						</div>
						<div v-if="items.floor==10" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(tenthItem,index) in items.weChatPages">
									<img :src="tenthItem.picUrl" @click="linkUrlFn(tenthItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>
						
						<div class="Ehome_oneimg margin_bot" v-if="items.floor==11">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div class="Ehome_Twoimg flex margin_bot" v-if="items.floor==12">
							<li class="flex-center" v-for="(eleventhItem,index) in items.weChatPages">
								<img :src="eleventhItem.picUrl"  @click="linkUrlFn(eleventhItem.linkUrl)" class="img-responsive">
							</li>
						</div>
						<div class="Ehome_oneimg margin_bot" v-if="items.floor==13">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div class="Ehome_oneimg margin_bot" v-if="items.floor==14">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div class="Ehome_Twoimg flex margin_bot" v-if="items.floor==15">
							<li class="flex-center"  v-for="(fifteenthItem,index) in items.weChatPages">
								<img :src="fifteenthItem.picUrl" @click="linkUrlFn(fifteenthItem.linkUrl)" class="img-responsive">
							</li>
						</div>

						<div class="Ehome_oneimg margin_bot" v-if="items.floor==16">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						

						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==17">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(seventeenthItem_1,index) in items.weChatPages">
									<img v-if="seventeenthItem_1.sortNum==1" :src="seventeenthItem_1.picUrl" @click="linkUrlFn(seventeenthItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(seventeenthItem_2,index) in items.weChatPages">
										<img v-if="seventeenthItem_2.sortNum==2" :src="seventeenthItem_2.picUrl" @click="linkUrlFn(seventeenthItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(seventeenthItem_3,index) in items.weChatPages">
												<img v-if="seventeenthItem_3.sortNum==3" :src="seventeenthItem_3.picUrl" @click="linkUrlFn(seventeenthItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(seventeenthItem_4,index) in items.weChatPages">
												<img v-if="seventeenthItem_4.sortNum==4" :src="seventeenthItem_4.picUrl" @click="linkUrlFn(seventeenthItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==18">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(eighteenthItem_1,index) in items.weChatPages">
									<img v-if="eighteenthItem_1.sortNum==1" :src="eighteenthItem_1.picUrl" @click="linkUrlFn(eighteenthItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(eighteenthItem_2,index) in items.weChatPages">
										<img v-if="eighteenthItem_2.sortNum==2" :src="eighteenthItem_2.picUrl" @click="linkUrlFn(eighteenthItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(eighteenthItem_3,index) in items.weChatPages">
												<img v-if="eighteenthItem_3.sortNum==3" :src="eighteenthItem_3.picUrl" @click="linkUrlFn(eighteenthItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(eighteenthItem_4,index) in items.weChatPages">
												<img v-if="eighteenthItem_4.sortNum==4" :src="eighteenthItem_4.picUrl" @click="linkUrlFn(eighteenthItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==19">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(nineteenthtem_1,index) in items.weChatPages">
									<img v-if="nineteenthtem_1.sortNum==1" :src="nineteenthtem_1.picUrl" @click="linkUrlFn(nineteenthtem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(nineteenthtem_2,index) in items.weChatPages">
										<img v-if="nineteenthtem_2.sortNum==2" :src="nineteenthtem_2.picUrl" @click="linkUrlFn(nineteenthtem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(nineteenthtem_3,index) in items.weChatPages">
												<img v-if="nineteenthtem_3.sortNum==3" :src="nineteenthtem_3.picUrl" @click="linkUrlFn(nineteenthtem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(nineteenthtem_4,index) in items.weChatPages">
												<img v-if="nineteenthtem_4.sortNum==4" :src="nineteenthtem_4.picUrl" @click="linkUrlFn(nineteenthtem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==20">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(twentiethtem_1,index) in items.weChatPages">
									<img v-if="twentiethtem_1.sortNum==1" :src="twentiethtem_1.picUrl" @click="linkUrlFn(twentiethtem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(twentiethtem_2,index) in items.weChatPages">
										<img v-if="twentiethtem_2.sortNum==2" :src="twentiethtem_2.picUrl" @click="linkUrlFn(twentiethtem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(twentiethtem_3,index) in items.weChatPages">
												<img v-if="twentiethtem_3.sortNum==3" :src="twentiethtem_3.picUrl" @click="linkUrlFn(twentiethtem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(twentiethtem_4,index) in items.weChatPages">
												<img v-if="twentiethtem_4.sortNum==4" :src="twentiethtem_4.picUrl" @click="linkUrlFn(twentiethtem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==21">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(twentyfirstItem_1,index) in items.weChatPages">
									<img v-if="twentyfirstItem_1.sortNum==1" :src="twentyfirstItem_1.picUrl" @click="linkUrlFn(twentyfirstItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(twentyfirstItem_2,index) in items.weChatPages">
										<img v-if="twentyfirstItem_2.sortNum==2" :src="twentyfirstItem_2.picUrl" @click="linkUrlFn(twentyfirstItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(twentyfirstItem_3,index) in items.weChatPages">
												<img v-if="twentyfirstItem_3.sortNum==3" :src="twentyfirstItem_3.picUrl" @click="linkUrlFn(twentyfirstItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(twentyfirstItem_4,index) in items.weChatPages">
												<img v-if="twentyfirstItem_4.sortNum==4" :src="twentyfirstItem_4.picUrl" @click="linkUrlFn(twentyfirstItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==22">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(twentysecondItem_1,index) in items.weChatPages">
									<img v-if="twentysecondItem_1.sortNum==1" :src="twentysecondItem_1.picUrl" @click="linkUrlFn(twentysecondItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(twentysecondItem_2,index) in items.weChatPages">
										<img v-if="twentysecondItem_2.sortNum==2" :src="twentysecondItem_2.picUrl" @click="linkUrlFn(twentysecondItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(twentysecondItem_3,index) in items.weChatPages">
												<img v-if="twentysecondItem_3.sortNum==3" :src="twentysecondItem_3.picUrl" @click="linkUrlFn(twentysecondItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(twentysecondItem_4,index) in items.weChatPages">
												<img v-if="twentysecondItem_4.sortNum==4" :src="twentysecondItem_4.picUrl" @click="linkUrlFn(twentysecondItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==23">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(twentythirdItem_1,index) in items.weChatPages">
									<img v-if="twentythirdItem_1.sortNum==1" :src="twentythirdItem_1.picUrl" @click="linkUrlFn(twentythirdItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(twentythirdItem_2,index) in items.weChatPages">
										<img v-if="twentythirdItem_2.sortNum==2" :src="twentythirdItem_2.picUrl" @click="linkUrlFn(twentythirdItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(twentythirdItem_3,index) in items.weChatPages">
												<img v-if="twentythirdItem_3.sortNum==3" :src="twentythirdItem_3.picUrl" @click="linkUrlFn(twentythirdItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(twentythirdItem_4,index) in items.weChatPages">
												<img v-if="twentythirdItem_4.sortNum==4" :src="twentythirdItem_4.picUrl" @click="linkUrlFn(twentythirdItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==24">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(twentyfourItem_1,index) in items.weChatPages">
									<img v-if="twentyfourItem_1.sortNum==1" :src="twentyfourItem_1.picUrl" @click="linkUrlFn(twentyfourItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(twentyfourItem_2,index) in items.weChatPages">
										<img v-if="twentyfourItem_2.sortNum==2" :src="twentyfourItem_2.picUrl" @click="linkUrlFn(twentyfourItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(twentyfourItem_3,index) in items.weChatPages">
												<img v-if="twentyfourItem_3.sortNum==3" :src="twentyfourItem_3.picUrl" @click="linkUrlFn(twentyfourItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(twentyfourItem_4,index) in items.weChatPages">
												<img v-if="twentyfourItem_4.sortNum==4" :src="twentyfourItem_4.picUrl" @click="linkUrlFn(twentyfourItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==25">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(twentyfiveItem_1,index) in items.weChatPages">
									<img v-if="twentyfiveItem_1.sortNum==1" :src="twentyfiveItem_1.picUrl" @click="linkUrlFn(twentyfiveItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(twentyfiveItem_2,index) in items.weChatPages">
										<img v-if="twentyfiveItem_2.sortNum==2" :src="twentyfiveItem_2.picUrl" @click="linkUrlFn(twentyfiveItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(twentyfiveItem_3,index) in items.weChatPages">
												<img v-if="twentyfiveItem_3.sortNum==3" :src="twentyfiveItem_3.picUrl" @click="linkUrlFn(twentyfiveItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(twentyfiveItem_4,index) in items.weChatPages">
												<img v-if="twentyfiveItem_4.sortNum==4" :src="twentyfiveItem_4.picUrl" @click="linkUrlFn(twentyfiveItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==26">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(twentysixItem_1,index) in items.weChatPages">
									<img v-if="twentysixItem_1.sortNum==1" :src="twentysixItem_1.picUrl" @click="linkUrlFn(twentysixItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(twentysixItem_2,index) in items.weChatPages">
										<img v-if="twentysixItem_2.sortNum==2" :src="twentysixItem_2.picUrl" @click="linkUrlFn(twentysixItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(twentysixItem_3,index) in items.weChatPages">
												<img v-if="twentysixItem_3.sortNum==3" :src="twentysixItem_3.picUrl" @click="linkUrlFn(twentysixItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(twentysixItem_4,index) in items.weChatPages">
												<img v-if="twentysixItem_4.sortNum==4" :src="twentysixItem_4.picUrl" @click="linkUrlFn(twentysixItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==27">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(twentysevenItem_1,index) in items.weChatPages">
									<img v-if="twentysevenItem_1.sortNum==1" :src="twentysevenItem_1.picUrl" @click="linkUrlFn(twentysevenItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(twentysevenItem_2,index) in items.weChatPages">
										<img v-if="twentysevenItem_2.sortNum==2" :src="twentysevenItem_2.picUrl" @click="linkUrlFn(twentysevenItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(twentysevenItem_3,index) in items.weChatPages">
												<img v-if="twentysevenItem_3.sortNum==3" :src="twentysevenItem_3.picUrl" @click="linkUrlFn(twentysevenItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(twentysevenItem_4,index) in items.weChatPages">
												<img v-if="twentysevenItem_4.sortNum==4" :src="twentysevenItem_4.picUrl" @click="linkUrlFn(twentysevenItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==28">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(twentyeightItem_1,index) in items.weChatPages">
									<img v-if="twentyeightItem_1.sortNum==1" :src="twentyeightItem_1.picUrl" @click="linkUrlFn(twentyeightItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(twentyeightItem_2,index) in items.weChatPages">
										<img v-if="twentyeightItem_2.sortNum==2" :src="twentyeightItem_2.picUrl" @click="linkUrlFn(twentyeightItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(twentyeightItem_3,index) in items.weChatPages">
												<img v-if="twentyeightItem_3.sortNum==3" :src="twentyeightItem_3.picUrl" @click="linkUrlFn(twentyeightItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(twentyeightItem_4,index) in items.weChatPages">
												<img v-if="twentyeightItem_4.sortNum==4" :src="twentyeightItem_4.picUrl" @click="linkUrlFn(twentyeightItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>


						<div class="Ehome_fourimg margin_bot flex"  v-if="items.floor==29" >
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(twentyninthItem_1,index) in items.weChatPages">
									<img v-if="twentyninthItem_1.sortNum==1" :src="twentyninthItem_1.picUrl" @click="linkUrlFn(twentyninthItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(twentyninthItem_2,index) in items.weChatPages">
										<img v-if="twentyninthItem_2.sortNum==2" :src="twentyninthItem_2.picUrl" @click="linkUrlFn(twentyninthItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(twentyninthItem_3,index) in items.weChatPages">
												<img v-if="twentyninthItem_3.sortNum==3" :src="twentyninthItem_3.picUrl" @click="linkUrlFn(twentyninthItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(twentyninthItem_4,index) in items.weChatPages">
												<img v-if="twentyninthItem_4.sortNum==4" :src="twentyninthItem_4.picUrl" @click="linkUrlFn(twentyninthItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<div class="Ehome_fourimg flex margin_bot"  v-if="items.floor==30">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(thirtiethItem_1,index) in items.weChatPages">
									<img v-if="thirtiethItem_1.sortNum==1" :src="thirtiethItem_1.picUrl" @click="linkUrlFn(thirtiethItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(thirtiethItem_2,index) in items.weChatPages">
										<img v-if="thirtiethItem_2.sortNum==2" :src="thirtiethItem_2.picUrl" @click="linkUrlFn(thirtiethItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(thirtiethItem_3,index) in items.weChatPages">
												<img v-if="thirtiethItem_3.sortNum==3" :src="thirtiethItem_3.picUrl" @click="linkUrlFn(thirtiethItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(thirtiethItem_4,index) in items.weChatPages">
												<img v-if="thirtiethItem_4.sortNum==4" :src="thirtiethItem_4.picUrl" @click="linkUrlFn(thirtiethItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<div class="Ehome_fourimg margin_bot flex"  v-if="items.floor==31">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(thirtyfirstItem_1,index) in items.weChatPages">
									<img v-if="thirtyfirstItem_1.sortNum==1" :src="thirtyfirstItem_1.picUrl" @click="linkUrlFn(thirtyfirstItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(thirtyfirstItem_2,index) in items.weChatPages">
										<img v-if="thirtyfirstItem_2.sortNum==2" :src="thirtyfirstItem_2.picUrl" @click="linkUrlFn(thirtyfirstItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(thirtyfirstItem_3,index) in items.weChatPages">
												<img v-if="thirtyfirstItem_3.sortNum==3" :src="thirtyfirstItem_3.picUrl" @click="linkUrlFn(thirtyfirstItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(thirtyfirstItem_4,index) in items.weChatPages">
												<img v-if="thirtyfirstItem_4.sortNum==4" :src="thirtyfirstItem_4.picUrl" @click="linkUrlFn(thirtyfirstItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						
						<div class="Ehome_fourimg margin_bot flex"  v-if="items.floor==32">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(thirtysecondItem_1,index) in items.weChatPages">
									<img v-if="thirtysecondItem_1.sortNum==1" :src="thirtysecondItem_1.picUrl" @click="linkUrlFn(thirtysecondItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(thirtysecondItem_2,index) in items.weChatPages">
										<img v-if="thirtysecondItem_2.sortNum==2" :src="thirtysecondItem_2.picUrl" @click="linkUrlFn(thirtysecondItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(thirtysecondItem_3,index) in items.weChatPages">
												<img v-if="thirtysecondItem_3.sortNum==3" :src="thirtysecondItem_3.picUrl" @click="linkUrlFn(thirtysecondItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(thirtysecondItem_4,index) in items.weChatPages">
												<img v-if="thirtysecondItem_4.sortNum==4" :src="thirtysecondItem_4.picUrl" @click="linkUrlFn(thirtysecondItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<div class="Ehome_fourimg margin_bot flex"  v-if="items.floor==33">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(thirtythirdItem_1,index) in items.weChatPages">
									<img v-if="thirtythirdItem_1.sortNum==1" :src="thirtythirdItem_1.picUrl" @click="linkUrlFn(thirtythirdItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(thirtythirdItem_2,index) in items.weChatPages">
										<img v-if="thirtythirdItem_2.sortNum==2" :src="thirtythirdItem_2.picUrl" @click="linkUrlFn(thirtythirdItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(thirtythirdItem_3,index) in items.weChatPages">
												<img v-if="thirtythirdItem_3.sortNum==3" :src="thirtythirdItem_3.picUrl" @click="linkUrlFn(thirtythirdItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(thirtythirdItem_4,index) in items.weChatPages">
												<img v-if="thirtythirdItem_4.sortNum==4" :src="thirtythirdItem_4.picUrl" @click="linkUrlFn(thirtythirdItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<div class="Ehome_fourimg margin_bot flex"  v-if="items.floor==34">
							<div class="Ehome_four_lf flex-center" > 
								<li v-for="(thirtyfourthItem_1,index) in items.weChatPages">
									<img v-if="thirtyfourthItem_1.sortNum==1" :src="thirtyfourthItem_1.picUrl" @click="linkUrlFn(thirtyfourthItem_1.linkUrl)" class="img-responsive">
								</li>
							</div>
							<ul class="Ehome_four_rt flex-center"> 
								<li class="Ehome_four_top">
									<span v-for="(thirtyfourthItem_2,index) in items.weChatPages">
										<img v-if="thirtyfourthItem_2.sortNum==2" :src="thirtyfourthItem_2.picUrl" @click="linkUrlFn(thirtyfourthItem_2.linkUrl)" class="img-responsive">
									</span>
								</li>
								<li>
									<ul class="Ehome_four_bottom flex">
										<li>
											<span v-for="(thirtyfourthItem_3,index) in items.weChatPages">
												<img v-if="thirtyfourthItem_3.sortNum==3" :src="thirtyfourthItem_3.picUrl" @click="linkUrlFn(thirtyfourthItem_3.linkUrl)" class="img-responsive">
											</span>
										</li>
										<li>
											<span v-for="(thirtyfourthItem_4,index) in items.weChatPages">
												<img v-if="thirtyfourthItem_4.sortNum==4" :src="thirtyfourthItem_4.picUrl" @click="linkUrlFn(thirtyfourthItem_4.linkUrl)"  class="img-responsive">
											</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<div class="Ehome_oneimg margin_bot" v-if="items.floor==35">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						
						<div class="Ehome_oneimg margin_bot" v-if="items.floor==36">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div v-if="items.floor==37" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(thirtyseventhItem,index) in items.weChatPages">
									<img :src="thirtyseventhItem.picUrl" @click="linkUrlFn(thirtyseventhItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>
						
						<div class="Ehome_oneimg margin_bot" v-if="items.floor==38">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div v-if="items.floor==39" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(thirtyninthItem,index) in items.weChatPages">
									<img :src="thirtyninthItem.picUrl" @click="linkUrlFn(thirtyninthItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>

						<div class="Ehome_oneimg margin_bot" v-if="items.floor==40">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div v-if="items.floor==41" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(fortyfirstItem,index) in items.weChatPages">
									<img :src="fortyfirstItem.picUrl" @click="linkUrlFn(fortyfirstItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>

						<div class="Ehome_oneimg margin_bot" v-if="items.floor==42">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div v-if="items.floor==43" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(fortythirdItem,index) in items.weChatPages">
									<img :src="fortythirdItem.picUrl" @click="linkUrlFn(fortythirdItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>


						<div class="Ehome_oneimg margin_bot" v-if="items.floor==44">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div v-if="items.floor==45" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(fortyfifthItem,index) in items.weChatPages">
									<img :src="fortyfifthItem.picUrl" @click="linkUrlFn(fortyfifthItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>
						<div class="Ehome_oneimg margin_bot" v-if="items.floor==46">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div v-if="items.floor==47" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(fortyseventhItem,index) in items.weChatPages">
									<img :src="fortyseventhItem.picUrl" @click="linkUrlFn(fortyseventhItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>
						<div class="Ehome_oneimg margin_bot" v-if="items.floor==48">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div v-if="items.floor==49" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(fortyninthItem,index) in items.weChatPages">
									<img :src="fortyninthItem.picUrl" @click="linkUrlFn(fortyninthItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>
						<div class="Ehome_oneimg margin_bot" v-if="items.floor==50">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div v-if="items.floor==51" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(fiftyfirstItem,index) in items.weChatPages">
									<img :src="fiftyfirstItem.picUrl" @click="linkUrlFn(fiftyfirstItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>
						<div class="Ehome_oneimg margin_bot" v-if="items.floor==52">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div v-if="items.floor==53" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(fiftythirdItem,index) in items.weChatPages">
									<img :src="fiftythirdItem.picUrl" @click="linkUrlFn(fiftythirdItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>
						<div class="Ehome_oneimg margin_bot" v-if="items.floor==54">
							<img :src="items.weChatPages[0].picUrl" @click="linkUrlFn(items.weChatPages[0].linkUrl)" class="img-responsive" width="100%" >
						</div>
						<div v-if="items.floor==55" class="margin_bot">
							<ul class="Ehome_Threeimg flex" >
								<li class="flex-center" v-for="(fiftyfifthItem,index) in items.weChatPages">
									<img :src="fiftyfifthItem.picUrl" @click="linkUrlFn(fiftyfifthItem.linkUrl)" class="img-responsive">
								</li>
							</ul> 
						</div>
					
					   <!-- 左1右2 -->
						<!--   <div class="Ehome_fourimg flex margin_bot Ehome_lf_rttwo" >
								<div class="Ehome_four_lf flex-center " > 
									<li>
										<img src="./img/1.jpg"  class="img-responsive">
									</li>
								</div>
								<ul class="Ehome_four_rt flex-center"> 
									<li class="Ehome_four_top">
										<img src="./img/2.jpg"  class="img-responsive">
									</li>
									<li class="Ehome_four_top">
										<img src="./img/2.jpg" class="img-responsive">
									</li>
								</ul>
							</div>  -->
						<!-- 七张图轮播 -->
						<!-- <div class="swiper-seven">
							<mt-swipe  :auto="2500">
							  <mt-swipe-item :show-indicators="false" >
									<div class="swiper-sevenbox">
										<ul class="swiper_seven_top">
											<li class="item1">
												<img src="./img/s2.png"  class="img-responsive">
											</li>
											<li class="item2 ">
												<img src="./img/s1.png"  class="img-responsive">
												
											</li>
											<li class="item1">
												<img src="./img/s3.png"  class="img-responsive">
												
											</li>
										</ul>
										<ul class="swiper_seven_bot">
											<li class="item1">
												<img src="./img/s3.png"  class="img-responsive">
											</li>
											<li class="item1">
												<img src="./img/s2.png"  class="img-responsive">
											</li>
											<li class="item1">
												<img src="./img/s3.png"  class="img-responsive">
											</li>
											<li class="item1">
												<img src="./img/s2.png"  class="img-responsive">
											</li>
										</ul>
									</div>

							  </mt-swipe-item>

							</mt-swipe>
						</div> -->
							<!-- <div class="Ehome_fourimg flex"  v-if="items.floor==11">
								<div class="Ehome_four_lf flex-center"> 
									<img src="./home/2.png" class="img-responsive">
								</div>
								<ul class="Ehome_four_rt flex-center"> 
									<li>
										<img src="./home/11.png" class="img-responsive">
									</li>
									<li>
										<ul class="Ehome_four_bottom flex">
											<li>
												<img src="./home/111.png" class="img-responsive">
											</li>
											<li>
												<img src="./home/111.png" class="img-responsive">
												
											</li>
										</ul>
									</li>
								</ul>
							</div> -->
					</li>
				</ul>
			</div>
		
			<div class="footer_bot">
				<mt-tabbar>
					<mt-tab-item id="tab1" >
						<div  @click="goPage('Ehome')" :class="{'on': clicked === 'Ehome' }" >
							<span class="icon1" ></span>
							<p class="icon_font">首页</p>
						</div>
						
					</mt-tab-item>
					<mt-tab-item id="tab2" >
						<div  @click="goPage('CategoryPage')" :class="{'on': clicked === 'CategoryPage' }">
							<span class="icon2" ></span>
							<p class="icon_font" >分类</p>
						</div>
					</mt-tab-item>
					<mt-tab-item id="tab3" >
						<div  @click="goPage('ShoppingCard')"  :class="{'on': clicked === 'ShoppingCard' }">
							<span class="icon3" ></span>
							<p class="icon_font">购物车</p>
						</div>
					</mt-tab-item>
					<mt-tab-item id="tab4" >
						<div @click="goPage('PersonalCenter')" :class="{'on': clicked === 'PersonalCenter' }">
							<span class="icon4" ></span>
							<p  class="icon_font">我的</p>
						</div>
					</mt-tab-item>
				</mt-tabbar>
			</div>
		</div>
		<search  :class="{'shows':!isShows}" @getIsShow="SetisShow" ></search>
	</div>
</template>
<script>
import Search from './Search'
import {setCookie,getCookie} from './../cookie/cookie.js'
import { Tabbar, TabItem } from 'mint-ui';
import router from '@/router'
import qs from 'qs'
import Vue from 'vue'
import {Indicator} from 'mint-ui';
export default{
	name:'Ehome',
	components:{
		Search,
	},
	data(){
		return {
			i:100,
			dataList:[],
			dataInfo:{
	 			mallId:getCookie('mallId')
			},
			isShows:false,
			clicked:'Ehome',
     		getUrl:getCookie('getUrl')
		}
	},
	methods:{
		SetisShow(data){
    		this.isShows = data;
    	},
    	goPage(Gopage){
			this.clicked = Gopage
			this.$router.push({path:'/'+Gopage})
		},
		searchInfo(){
			Indicator.open('Loading...');
			var url = this.$store.state.localHostUrl +'/goHomePage.json'
      		var data= qs.stringify(this.dataInfo)
      		var that = this
      		that.$http.post(url,data,{emulateJSON:true}).then(
      			function (res){
      				let getUrl= res.data.personalCenterUrl
      				setCookie('getUrl',getUrl,1000*60)
      				if(res.data.ret==0){
      					// console.log(res.data.data)
      					that.dataList=res.data.data
						Indicator.close('Loading...');
      				}
					else{
						// alert(res.data.descript)
						Indicator.close('Loading...');

					}
      			}
      		)
		},
		linkUrlFn(url){
			// console.log(url)
			if(url!=""){
				window.location.href=url
			}
		},

		isShowFn(){
        	this.isShows=!this.isShows;
        },
        getUrlKey (name) {
	      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
	    },

	},
	mounted(){
		this.searchInfo();
		this.$store.state.refererUrl = decodeURIComponent(this.getUrlKey('refererUrl'))
		if(this.$store.state.refererUrl!="NULL"){
			window.addEventListener("popstate", function(e) { 
		       window.location.href=that.$store.state.refererUrl
		    }, false); 
		}else{
			let url=this.getUrlKey('close')
			if(url){
				WeixinJSBridge.invoke('closeWindow',{},function(res){
				})
			}
			
		}
	}

}
</script>
<style>

/*	.swiper_flexcen{
		flex: 1 1 auto;
		text-align: center;
	}*/

	.swiper_seven_bot>.item1{flex: 1 1 auto;	text-align: center;}
	.toolbar_search{width: 80%;margin:0 auto;position: relative;padding:12px 0;}
	.toolbar_search>input{height: 30px;line-height: 30px; text-align: center;width: 100%;border-radius: 10px;}
	.toolbar_search .glyphicon-search{position:absolute;transform: translateX(-50%) translateY(-50%);left: 50%; top:50%;color:#A2A2A2;font-size: 0.5rem;line-height: 30px;}
	.margin_bot{margin-bottom:5px;}
	.Ehome_swiper{height:180px;width: 100%; max-height: 180px;}
	.Ehome_navbar{background: #fff;}
	.Ehome_navbar .flex {    display: flex;  flex-direction: row;  flex-wrap: wrap;text-align: center;padding-bottom:20px;}
	.Ehome_navbar .flex li{width: 25%; box-sizing: border-box;}
	.Ehome_navbar .flex li img{ margin:0 auto;}
	.Ehome_oneimg{ }
	.img-responsive {
	  display: block;
	  height: 100%;
	  width: 100%;box-sizing: border-box;
	}
	.Ehome_Twoimg li{width: 50%;}
	.Ehome_Twoimg li:first-child{padding-right: 5px;}
	.Ehome_Threeimg li{padding-right: 5px;width: 33.33%}
	.Ehome_Threeimg li:last-child{padding-right: 0;}
	.Ehome_four_lf{padding-right: 5px;flex:0.8;}
	.Ehome_four_rt{flex:1.1}
	/*.Ehome_four_rt li:first-child{padding-bottom:3px;}*/
	.Ehome_four_rt>li{width: 100%;    height: 50%;}
	.Ehome_four_bottom li:first-child{margin-right: 3px;}
	/*.Ehome_four_bottom li:last-child{margin-bottom: 3px;}*/

	.Ehome_four_rt img{height: 100%}
	.Ehome_four_bottom {height: 100%}
	.Ehome_four_bottom li{width: 50%}
	.toolbar_searchBox{position: absolute; font-size: 0.7rem; color:#9A9A9A;transform: translateY(-50%) translateX(-50%) ;top:50%; left: 50%;}
	.toolbar_searchBox>img{
		 vertical-align: top;padding-right:3px;
	}
	.Ehome_four_top{
		padding-bottom: 3px;
		    box-sizing: border-box;
	}
	.Ehome_boxs{
		margin-bottom:58px;
		position: relative;
	}
	.Ehome_lf_rttwo>.Ehome_four_lf{
		width: 50%;
		    flex: 1;
	}
	.Ehome_lf_rttwo>.Ehome_four_rt{
		width: 50%;
		flex:1;
	}
		.swiper_seven_top,.swiper_seven_bot{
		display: flex;
	}
	.item1{flex:1 1 auto;}
	.item2{flex:2 1 auto;}

		.Ehome_toolbar{
		/*background: #F79E20;*/
	   position: absolute;
	    z-index: 10;
	    width: 100%;
	}
	.swiper-seven{   
	 height: 163px;
    max-height: 163px;
    margin: 8px 0;}
	.swiper_seven_top>.item1,.swiper_seven_top>.item2{height: 90px;padding:3px;}
	.item1>img,.item2>img{border:1px solid #ddd;}
	.swiper_seven_top>.item2{padding:3px 0;}
	.swiper_seven_bot>.item1{height: 63px;padding-right:3px;padding-bottom:3px;}
	.swiper_seven_bot>.item1:first-child{padding-left:3px;}
	.swiper-sevenbox{background: #fff;}
	.Ehome_lf_rttwo>.Ehome_four_lf img{height: 203px;}
	.Ehome_lf_rttwo .Ehome_four_top img{height: 100px;}
</style>