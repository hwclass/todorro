$(document).ready(function () {

  var _id, _content, _done;

  $('.editAction').on('click', function (event) {
    event.preventDefault();
    _id = $(this).data('id');
    _content = $(this).parent('.todoItem').find('.content').text();
    $(this).hide();
    $(this).next('.deleteAction').hide();
    $(this).parent('.todoItem').find('.content').empty().html('<input type="text" value="' + _content + '" id="editedContent"/>');
    $(this).after('<a href="#" title="Update this todo item" class="fl ml10 updateAction">Update</a>');
  });

  $(document).on('click', '.updateAction', function(event){
     updateTodoItem(_id, $('#editedContent').val());
  });

  $(document).on('click', '.updateStatusAction', function(event){
    event.preventDefault();
    _id = $(this).data('id');
    _done = !$(this).data('status');
     updateStatusTodoItem(_id, _done);
  });

  function updateTodoItem (id, content) {
    var jqxhr = $.ajax({
      type: "POST",
      url: "/update",
      data: { id: id, content: content }
    }).done(function() {
      $('#editedContent').remove();
      location.reload();
    }).fail(function(err) {
      console.log(err);
    }).always(function() {
      console.log("complete");
    });
  }

  function updateStatusTodoItem (id, done) {
    var jqxhr = $.ajax({
      type: "POST",
      url: "/status",
      data: { id: id, done: done }
    }).done(function() {
      // $('#editedContent').remove();
      location.reload();
    }).fail(function(err) {
      console.log(err);
    }).always(function() {
      console.log("complete");
    });
  }

});

function formatDates () {
  var dates = $('.date');
  var dateArr = new Array();
  for (var index in dates) {
    dateArr.push($(dates[index]).html().split(' '));
    $($('.date').get(index)).html(dateArr[index][2] + ' ' + dateArr[index][1] + ' ' + dateArr[index][3] + ' ' + dateArr[index][4]);
  }
}

formatDates();
