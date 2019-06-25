"use strict";

var app = angular.module("carouselTest", []);

app.controller("CarouselCtrl", CarouselCtrl);

function CarouselCtrl() {
  var vm = this;

  vm.active = 0;
  vm.images = [
    "https://i.imgur.com/Fv7yA6o.jpg",
    "https://i.imgur.com/eGTfLGC.jpg",
    "https://i.imgur.com/14dElVA.jpg",
    "https://i.imgur.com/J48OQ3U.jpg",
    "https://i.imgur.com/7vD7dSL.jpg",
    "https://i.imgur.com/kRkJC8g.jpg"
  ];
  vm.position = position;
  vm.next = next;
  vm.prev = prev;

  var pLen = vm.images.length;

  function position(key) {
    return {
      left: key < vm.active,
      right: key > vm.active,
      hide: Math.abs(vm.active - key) > 1
    };
  }

  function next() {
    if (vm.active < pLen - 1) {
      vm.active += 1;
    }
  }

  function prev() {
    if (vm.active > 0) {
      vm.active -= 1;
    }
  }
}
