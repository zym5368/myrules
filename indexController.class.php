<?php
	defined('IN_ROOT') || die('Access Deny');

	class indexController extends commonController{
		
		public function indexAction(){

			$this->view->assign('site_id',$GLOBALS['site_id']);
			//获取该用户可以使用的菜单
			$controller_name=getController();
			$controller_name=str_ireplace("Controller","",$controller_name);

			$action_name=getAction();
			$action_name=str_ireplace("Action","",$action_name);
			$per=$controller_name."_".$action_name;
			$per=strtolower($per);

			//获取有资格显示的菜单
			//$arr=array("")
			$action=$_SESSION['admin']['action'];//拥有的权限

			
			$content=file_get_contents(DATA_DIR."menu/menu.json");
			$menu_arr=json_decode($content,true);
			foreach($menu_arr as $k=>$v){
				$text=$v['title'];
				$link=$v['link'];
				$permission=$v['permission'];
				if($_SESSION['admin']['action']=='all'||$permission=='system'||strpos($_SESSION['admin']['action'],$permission)!==false){
					$parent=explode('_', $permission);
					$menu[]=array(
						'text'=>$text,
						'link'=>$link."&site_id=".$GLOBALS['site_id'],
						'permission'=>$permission,
						'parent'=>$parent[0],
					);		
				}
			}

			// $items=$xmlDoc->getElementsByTagName('item');
			// for($i=0,$len=$items->length;$i<$len;$i++){
			// 	$item=$items->item($i);
			// 	$text=$item->getElementsByTagName('text')->item(0);
			// 	$link=$item->getElementsByTagName('link')->item(0);
			// 	$permission=$item->getElementsByTagName('permission')->item(0);
				
			// 	if($_SESSION['admin']['action']=='all'||$permission->nodeValue=='system'||strpos($_SESSION['admin']['action'],$permission->nodeValue)!==false){
			// 		$parent=explode('_', $permission->nodeValue);
			// 		$menu[]=array(
			// 			'text'=>$text->nodeValue,
			// 			'link'=>$link->nodeValue."&site_id=".$GLOBALS['site_id'],
			// 			'permission'=>$permission->nodeValue,
			// 			'parent'=>$parent[0],
			// 		);		
			// 	}

			// }
			//构造一个二维数组
			//var_dump($menu);
			$menu_arr=array();
			foreach ($menu as $key => $value) {
				$menu_arr[$value['parent']][]=$value;
			};
			//var_dump($menu_arr);
			$this->view->assign('name',$_SESSION['admin']['admin_name']);
			$this->view->assign('menu',$menu_arr);
			$this->view->display('index.html');
		}
		public function index2Action(){
			$this->view->assign('site_id',$GLOBALS['site_id']);
			$member=new memberModel();
			
			$listAll=$member->selectTopAll(false,false);
			$pagesize=10;
			$total=count($listAll);
			if(!isset($_GET['page'])){
				$page=1;
			}else{
				if($_GET['page']>ceil($total/$pagesize)){
					$page=ceil($total/$pagesize);
				}else{
					$page=$_GET['page'];
				}
			}
			$offset=($page-1)*$pagesize+0;

			//$list=$model->getListByMenuId($menu_id,$offset,$pagesize);
			

			
			$list=$member->selectTopAll($offset,$pagesize);
			

			$helper_page=new helper_page2($total,$page,$pagesize);
			$page_html=$helper_page->html();

			
			
			
			
			$this->view->assign('list',$list);
			
			
			$this->view->assign('page_html',$page_html);
			$this->view->display('index2.html');
		}
		public function upgradeAction(){
			$model=new memberModel();
			
			
			
			
				$data['type']=2;
				if($model->update($data,$_POST['mem_id'])){
					echo 1;
				}else{
					echo 2;
				}
			
			
		}
		public function degradeAction(){
			$model=new memberModel();
			
			
			
			
				$data['type']=1;
				if($model->update($data,$_POST['mem_id'])){
					echo 1;
				}else{
					echo 2;
				}
			
		}	
		
		public function searchAction(){

			
			$model=new memberModel();
			
			$listAll=$model->getListByKey(trim($_POST['keyword']));
			
			$pagesize=10;
			$total=count($listAll);
			if(!isset($_GET['page'])){
				$page=1;
			}else{
				if($_GET['page']>ceil($total/$pagesize)){
					$page=ceil($total/$pagesize);
				}else{
					$page=$_GET['page'];
				}
			}
			$offset=($page-1)*$pagesize+0;

			//$list=$model->getListByMenuId($menu_id,$offset,$pagesize);
			

			
			$list=$model->getListByKey(trim($_POST['keyword']),$offset,$pagesize);

			$helper_page=new helper_page($total,$page,$pagesize);
			$page_html=$helper_page->html();

			
			

			
			
			
			
			$this->view->assign('list',$list);
			
			$this->view->assign("site_id",$GLOBALS['site_id']);
			$this->view->assign('page_html',$page_html);
			$html='index2.html';
			$this->view->display($html);
		}
		public function topAction(){
			
			$site=new siteModel();
			$rows=$site->select();
			$this->view->assign('rows',$rows);			
			$this->view->display('top.html');
		}
		public function leftAction(){
			$site_id=$GLOBALS['site_id'];
			$xmlDoc=new DOMDocument();
			$xmlDoc->load(DATA_DIR."menu/menu.xml");
			$items=$xmlDoc->getElementsByTagName('item');
			for($i=0,$len=$items->length;$i<$len;$i++){
				$item=$items->item($i);
				$text=$item->getElementsByTagName('text')->item(0);
				$link=$item->getElementsByTagName('link')->item(0);
				$permission=$item->getElementsByTagName('permission')->item(0);
				
				if($_SESSION['admin']['action']=='all'||$permission->nodeValue=='system'||strpos($_SESSION['admin']['action'],$permission->nodeValue)!==false){
					$menu[]=array(
						'text'=>$text->nodeValue,
						'link'=>$link->nodeValue."&site_id=".$site_id,
						'permission'=>$permission->nodeValue,
					);		
				}

			}
		
			$this->view->assign('site_id',$site_id);
			$this->view->assign('menu',$menu);
			$this->view->display('left.html');
		
		}
		public function rightAction(){
			$site=new siteModel();
			$item=$site->find($GLOBALS['site_id']);

		
			$size=$GLOBALS['max_upload_size'];
			$type=implode(',',$GLOBALS['upload_allow_type']);
			$this->view->assign('item',$item);
			$this->view->assign('size',$size);
			$this->view->assign('type',$type);			
			$this->view->display('right.html');

		}		
	}
	
	