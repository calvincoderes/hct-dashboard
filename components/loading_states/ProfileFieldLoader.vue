<template>
  <div>
    <b-row class="mt-4">
      <b-col cols="12" xl="12" lg="12">
        <b-row>
          <b-col cols="3" xl="3" lg="3" class="pr-0">
            <div class="animated-profile-image" />
          </b-col>
          <b-col cols="9" xl="9" lg="9">
            <b-row class="mt-3">
              <b-col cols="10" xl="10" lg="10">
                <div class="animated-text-label" />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="5" xl="5" lg="5">
                <div class="animated-text-label" />
              </b-col>
              <b-col cols="3" xl="3" lg="3">
                <div class="animated-text-label" />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="7" xl="7" lg="7">
                <div class="animated-text-label" />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="8" xl="8" lg="8">
                <div class="animated-text-label" />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="5" xl="5" lg="5">
                <div class="animated-text-label" />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="6" xl="6" lg="6">
                <div class="animated-text-label" />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="9" xl="9" lg="9">
                <div class="animated-text-label" />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="4" xl="4" lg="4">
                <div class="animated-text-label" />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="8" xl="8" lg="8">
                <div class="animated-text-label" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<style>
    @keyframes placeHolderShimmer{
        0%{
            background-position: -468px 0
        }
        100%{
            background-position: 468px 0
        }
    }
    .animated-profile-image {
        animation-duration: 3s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background: #f6f7f8;
        background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        background-size: 800px 104px;
        height: 160px;
        position: relative;
    }

    .animated-text-label {
        animation-duration: 2s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background: #f6f7f8;
        background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        background-size: 800px 104px;
        height: 10px;
        position: relative;
    }

</style>
